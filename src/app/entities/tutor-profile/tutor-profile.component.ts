import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { BadgesEnum, PlaceEnum, TutorDetailModel, TutorModel } from '../tutor/model/tutor.model';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DaysNumber } from '../tutor/model/days.enum';

interface AvailableHour {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorProfileComponent implements OnInit {

  Badges = BadgesEnum;
  Places = PlaceEnum;

  hoursAvailable: string[] = [];
  selected: Date | null = new Date(2023, 4, 19);
  tutor: TutorDetailModel;
  foods: AvailableHour[] = [
    { value: '0', viewValue: '16:00' },
    { value: '1', viewValue: '17:00' },
    { value: '2', viewValue: '18:00' }
  ];

  constructor(private readonly tutorService: TutorService, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tutorService.getTutorById(id).subscribe({
      next: (tutor) => {
        this.tutor = tutor;
        const withoutBrackets = this.tutor.hoursAvailable.slice(1, -1);
        this.hoursAvailable = withoutBrackets.split(', ');
      }
    });

  }

  hasBadge(badge: BadgesEnum): boolean {
    return this.tutor?.badges.includes(badge);
  }

  hasPlace(place: PlaceEnum): boolean {
    return this.tutor?.place.includes(place);
  }

  hideWeekends = (date: Date): MatCalendarCellCssClasses => {
    const numbersX = this.tutor?.daysAvailable
      .map((days) => DaysNumber[days]);

    return numbersX.includes(moment(date).day())
      ? ''
      : 'weekend';
  };
}
