import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoute: Routes = [
  {
    path: '',
    component: ProfileComponent,
    title: 'Strona główna'
  }
];
