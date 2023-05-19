import { Routes } from '@angular/router';
import { TutorProfileComponent } from './tutor-profile.component';

export const tutorProfileRoute: Routes = [
  {
    path: ':id',
    component: TutorProfileComponent,
    title: 'Strona główna'
  }
];
