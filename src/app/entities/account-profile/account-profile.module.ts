import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileComponent } from './account-profile.component';
import { RouterModule } from '@angular/router';
import { accountProfileRoute } from './account-profile.route';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccountProfileComponent
  ],
  imports: [
    RouterModule.forChild(accountProfileRoute),
    CommonModule,
    MatIconModule
  ]
})
export class AccountProfileModule {
}
