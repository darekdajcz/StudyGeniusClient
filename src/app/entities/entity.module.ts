import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminGuard } from '../shared/guard/admin.guard';
import { TutorStatsComponent } from './admin/tutor-stats/tutor-stats.component';
import { HelpSectionComponent } from './help-section/help-section.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./login/login.module')
          .then(module => module.LoginModule)
      }, {
        path: 'tutor',
        loadChildren: () => import('./tutor/tutor.module')
          .then(module => module.TutorModule),
        canLoad: [AuthGuard]
      }, {
        path: 'tutor-profile',
        loadChildren: () => import('./tutor-profile/tutor-profile.module')
          .then(module => module.TutorProfileModule),
        canLoad: [AuthGuard]
      }, {
        path: 'account-profile',
        loadChildren: () => import('./account-profile/account-profile.module')
          .then(module => module.AccountProfileModule),
        canLoad: [AuthGuard]
      }, {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component')
          .then(module => module.AdminComponent),
        canActivate: [AdminGuard]
      }, {
        path: 'tutor-stats',
        loadComponent: () => import('./admin/tutor-stats/tutor-stats.component')
          .then(module => module.TutorStatsComponent),
        canActivate: [AdminGuard]
      },
      {
        path: 'reservation-stats',
        loadComponent: () => import('./admin/reservation-stats/reservation-stats.component')
          .then(module => module.ReservationStatsComponent),
        canActivate: [AdminGuard]
      },
      {
        path: 'help',
        loadComponent: () => import('./help-section/help-section.component')
          .then(module => module.HelpSectionComponent),
        canLoad: [AuthGuard]
      }
    ]),
    CommonModule
  ]
})
export class EntityModule {
}
