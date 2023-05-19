import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorProfileComponent {
  selected = new Date(2023,4,19);

  foods: Food[] = [
    {value: '0', viewValue: '16:00'},
    {value: '1', viewValue: '17:00'},
    {value: '2', viewValue: '18:00'},
  ];
}
