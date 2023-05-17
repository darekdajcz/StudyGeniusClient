import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      }, {
        path: 'tutor',
        loadChildren: () => import('./tutor/tutor.module').then(module => module.TutorModule),
        canLoad: [AuthGuard]
      }, {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(module => module.AdminComponent),
        canLoad: [AuthGuard]
      }
    ]),
    CommonModule
  ]
})
export class EntityModule {
}
