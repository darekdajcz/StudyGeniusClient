import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      }, {
        path: 'car',
        loadChildren: () => import('./car/car.module').then(module => module.CarModule),
        canLoad: [AuthGuard]
      }
    ]),
    CommonModule
  ]
})
export class EntityModule {
}
