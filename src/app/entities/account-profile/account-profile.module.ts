import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileComponent } from './account-profile.component';
import { RouterModule } from '@angular/router';
import { accountProfileRoute } from './account-profile.route';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountProfileComponent
  ],
  imports: [
    RouterModule.forChild(accountProfileRoute),
    CommonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class AccountProfileModule {
}
