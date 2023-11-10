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
import { AuthRole } from '../login/components/models/auth-role';
import { AlertMessagesService } from '../../shared/services/alert-messages.service';

interface AvailableHour {
  value: string;
  viewValue: string;
}

const updateTime = (arg: number, time: string): string[] => {
  if (arg === 1) {
    return [];
  }

  let [hours, minutes] = time.split(':').map(Number);
  if (arg === 2) {
    minutes += 30;
    if (minutes >= 60) {
      hours += 1;
      minutes = 0;
    }
    let formattedHours = ('0' + hours).slice(-2);
    let formattedMinutes = ('0' + minutes).slice(-2);
    return [`${ formattedHours }:${ formattedMinutes }`];
  } else if (arg === 3) {
    let newHours1 = hours;
    let newMinutes1 = minutes + 30;
    if (newMinutes1 >= 60) {
      newHours1 += 1;
      newMinutes1 = 0;
    }
    let formattedHours1 = ('0' + newHours1).slice(-2);
    let formattedMinutes1 = ('0' + newMinutes1).slice(-2);

    let newHours2 = hours + 1;
    let newMinutes2 = minutes;
    let formattedHours2 = ('0' + newHours2).slice(-2);
    let formattedMinutes2 = ('0' + newMinutes2).slice(-2);

    return [`${ formattedHours1 }:${ formattedMinutes1 }`, `${ formattedHours2 }:${ formattedMinutes2 }`];
  }

  return [];
};

@Component({
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit {

  protected readonly Badges = BadgesEnum;
  protected readonly PlaceEnum = PlaceEnum;
  protected readonly Places = PlaceEnum;

  init = false;
  initCaledar = false;
  hoursAvailable: string[] = [];
  selected: Date | null = new Date(2023, 4, 19);
  tutor: TutorDetailModel;
  reservations: Reservation[];

  lessonHour: string;
  lessonTime?: number | null;
  place: PlaceEnum | null;
  tutorId: number;
  selectedIndex = 0;
  dateDisabled = new Map<string, number>;

  today = new Date();

  constructor(private readonly tutorService: TutorService, private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef, private readonly tokenService: TokenStorageService,
    private readonly alertMessagesService: AlertMessagesService) {
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

    this.getReservations();
  }

  isStudent(): boolean {
    return this.tokenService.getUser().role === AuthRole.STUDENT;
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

  isDisabled(hour: string): boolean {
    let isDisabled = false;
    if (this.dateDisabled.has(this.formatDate(this.selected))) {
      this.reservations.forEach((res) => {
        if (res.date === this.formatDate(this.selected)) {
          if (hour === res.lessonHour) {
            isDisabled = true;
          }

          const disableHours = updateTime(res.lessonTime, res.lessonHour);
          if (disableHours.includes(hour)) {
            isDisabled = true;
          }
        }
      });
      return isDisabled;
    }
    return isDisabled;
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
      .pipe(finalize(() => {
        this.alertMessagesService.info('success');
        this.cdRef.detectChanges();
      }))
      .subscribe({
        next: () => {
          this.lessonTime = null;
          this.lessonHour = '';
          this.place = null;
          this.getReservations();
        }
      });

  }

  private getReservations(): void {
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
}

