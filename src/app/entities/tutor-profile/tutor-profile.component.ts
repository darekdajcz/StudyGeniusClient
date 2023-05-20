import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { BadgesEnum, PlaceEnum, TutorModel } from '../tutor/model/tutor.model';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';

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

  selected: Date | null = new Date(2023, 4, 19);
  tutor: TutorModel;
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
      next: (tutor) => this.tutor = tutor
    });
  }

  hasBadge(badge: BadgesEnum): boolean {
    return this.tutor.badges.includes(badge);
  }

  hasPlace(place: PlaceEnum): boolean {
    return this.tutor.place.includes(place);
  }

  myHolidayDates = [
    new Date('12/1/2020'),
    new Date('12/20/2020'),
    new Date('12/17/2020'),
    new Date('12/25/2020'),
    new Date('12/4/2020'),
    new Date('12/7/2020'),
    new Date('12/12/2020'),
    new Date('12/11/2020'),
    new Date('12/26/2020'),
    new Date('12/25/2020')
  ];

  hideWeekends = (date: Date): MatCalendarCellCssClasses => {
    return moment(date).day() === 6 || moment(date).day() === 5
      ? 'weekend'
      : '';
  };
}
