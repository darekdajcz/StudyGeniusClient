import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminGuard } from '../shared/guard/admin.guard';

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
      }
    ]),
    CommonModule
  ]
})
export class EntityModule {
}
