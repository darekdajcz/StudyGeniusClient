import { Routes } from '@angular/router';
import { AccountProfileComponent } from './account-profile.component';

export const accountProfileRoute: Routes = [
  {
    path: '',
    component: AccountProfileComponent,
    title: 'Strona główna',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/my-profile/my-profile.component')
          .then(module => module.MyProfileComponent)
      }, {
        path: 'add-announcement',
        loadComponent: () => import('./components/active-announcements/active-announcement.component')
          .then(module => module.ActiveAnnouncementComponent)
      }, {
        path: 'student-lessons',
        loadComponent: () => import('./components/student-lessons/student-lessons.component')
          .then(module => module.StudentLessonsComponent)
      }
    ]
  }
];
