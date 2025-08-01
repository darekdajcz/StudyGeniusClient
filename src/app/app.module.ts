import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { EntityModule } from './entities/entity.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { authInterceptorProviders, translateModuleConfig, translateServiceProvider } from './provider.config';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessagesHandlerInterceptor } from './shared/interceptors/messages-handler.interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './shared/modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterModule,
    EntityModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatDividerModule,
    NgbModule,
    ReactiveFormsModule,
    MatIconModule,
    AppRoutingModule,
    SharedModule,
    MatMenuModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    TranslateModule.forRoot(translateModuleConfig),
    MatToolbarModule
  ],
  providers: [
    authInterceptorProviders,
    translateServiceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessagesHandlerInterceptor,
      multi: true
    }, {
      provide: LOCALE_ID,
      useValue: 'pl'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'Zł'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
