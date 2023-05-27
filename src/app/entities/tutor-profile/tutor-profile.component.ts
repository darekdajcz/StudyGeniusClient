import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { BadgesEnum, PlaceEnum, TutorDetailModel } from '../tutor/model/tutor.model';
import * as moment from 'moment';
import { DaysNumber } from '../tutor/model/days.enum';
import { Reservation } from '../tutor/model/reservation-response';
import { finalize } from 'rxjs';
import { AddReservationRequest } from '../tutor/model/add-reservation-request';
import { TokenStorageService } from '../../shared/services/token-storage.service';

interface AvailableHour {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit {

  Badges = BadgesEnum;
  Places = PlaceEnum;

  init = false;
  initCaledar = false;
  hoursAvailable: string[] = [];
  selected: Date | null = new Date(2023, 4, 19);
  tutor: TutorDetailModel;
  reservations: Reservation[];

  lessonHour: string;
  lessonTime: number;
  place: PlaceEnum;
  tutorId: number;
  selectedIndex = 0;
  dateDisabled = new Map<string, number>;

  today = new Date();

  constructor(private readonly tutorService: TutorService, private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef, private readonly tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.tutorId = this.route.snapshot.params['id'];
    this.tutorService.getTutorById(this.tutorId).subscribe({
      next: (tutor) => {
        this.tutor = tutor;
        const withoutBrackets = this.tutor.hoursAvailable.slice(1, -1);
        this.hoursAvailable = withoutBrackets.split(', ');
        this.cdRef.detectChanges();
      }
    });

    this.tutorService.getReservations(this.tutorId)
      .pipe(finalize(() => {
        this.reservations.forEach((res) => {
          if (!this.dateDisabled.has(res.date)) {
            this.dateDisabled.set(res.date, res.lessonTime);
          } else {
            this.dateDisabled.set(res.date, this.dateDisabled.get(res.date)! + res.lessonTime);
          }
        });
        this.cdRef.detectChanges();
        this.initCaledar = true;
      }))
      .subscribe({
        next: (res) => {
          this.reservations = res.reservations;

          this.cdRef.detectChanges();
        }
      });
  }

  hasBadge(badge: BadgesEnum): boolean {
    return this.tutor?.badges.includes(badge);
  }

  hasPlace(place: PlaceEnum): boolean {
    return this.tutor?.place.includes(place);
  }

  hideWeekends = (date: Date) => {

    const numbersX = this.tutor?.daysAvailable
      .map((days) => DaysNumber[days]);

    return numbersX.includes(moment(date).day()) && !this.isReserved(date);
  };

  formatDate(dateString: Date | null) {
    const date = new Date(dateString!);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${ day }-${ month }-${ year }`;
  }

  private isReserved(date: Date): boolean {

    const formatDate = this.formatDate(date);

    if (this.dateDisabled.has(formatDate)) {
      return this.dateDisabled.get(formatDate)! >= this.hoursAvailable.length;
    }
    return false;
  }

  isDisabled(hour: string) {
    let x = false;
    if (this.dateDisabled.has(this.formatDate(this.selected))) {
      this.reservations.forEach((res) => {
        if (res.date === this.formatDate(this.selected) && hour === res.lessonHour) {
          x = true;
        }
      });
      return x;
    }
    return false;
  }

  addReservation(): void {
    const {
      lessonHour, lessonTime, tutorId, place
    } = this;

    const studentId = this.tokenService.getUser().id;

    const req = {
      reservation: {
        date: this.formatDate(this.selected),
        lessonTime,
        lessonHour,
        place,
        tutorId,
        studentId
      }
    } as AddReservationRequest;

    this.tutorService
      .addReservation(req)
      .subscribe({});
  }

  protected readonly PlaceEnum = PlaceEnum;
}
