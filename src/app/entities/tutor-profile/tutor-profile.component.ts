import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { BadgesEnum, PlaceEnum, TutorModel } from '../tutor/model/tutor.model';

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

  selected = new Date(2023, 4, 19);
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
}
