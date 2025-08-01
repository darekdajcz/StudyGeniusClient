import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/pl';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { AlertMessagesComponent } from './components/alert-messages/alert-messages.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SortDirective } from './directives/sort.directive';
import { SortByDirective } from './directives/sort-by.directive';
import { CurrencyPipe } from './pipes/currency.pipe';
import { HasAuthorityDirective } from './directives/has-authority.directive';

@NgModule({
  declarations: [
    CurrencyPipe,
    AlertMessagesComponent,
    SortDirective,
    SortByDirective,
    HasAuthorityDirective
  ],
  exports: [
    CurrencyPipe,
    AlertMessagesComponent,
    SortDirective,
    SortByDirective,
    HasAuthorityDirective
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    MatIconModule,
    TranslateModule
  ]
})
export class SharedModule {
  constructor() {
    registerLocaleData(locales);
  }
}
