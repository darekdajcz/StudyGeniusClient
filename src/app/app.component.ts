import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TokenStorageService } from './shared/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  isLoggedIn = false;
  private opened = false;

  constructor(private readonly router: Router, private readonly cdRef: ChangeDetectorRef,
              private readonly tokenStorageService: TokenStorageService, private readonly translateService: TranslateService,
              private readonly authService: AuthService, private readonly observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    const lng = this.tokenStorageService.getLang();

    !!lng ? this.translateService.use(lng) : null;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
  }

  redirectTo(pathRedirectTo: string): void {
    this.router.navigate([pathRedirectTo]).then(() => this.opened = false);
  }

  logout(): void {
    this.authService.logout()
      .subscribe();
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
