import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { profileRoute } from './profile.route';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild(profileRoute),
    CommonModule
  ]
})
export class ProfileModule { }
