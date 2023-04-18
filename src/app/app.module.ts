import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { faIconsX } from './shared/font-awesome-icons/fa-icons';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule,
        FontAwesomeModule,
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
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...faIconsX)
  }
}
