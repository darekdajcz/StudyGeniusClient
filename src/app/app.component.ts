import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TokenStorageService } from './shared/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthRole } from './entities/login/components/models/auth-role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  isLoggedIn = false;
  private opened = false;
  protected readonly AuthRole = AuthRole;

  constructor(private readonly router: Router, private readonly cdRef: ChangeDetectorRef,
    private readonly tokenStorageService: TokenStorageService, private readonly translateService: TranslateService,
    private readonly authService: AuthService, private readonly observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUser()?.email;
    this.translateService.use(this.tokenStorageService.getLang() ? this.tokenStorageService.getLang() : 'pl');
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
    this.authService.logout().subscribe();
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  navigateToProfile(): void {
    this.router.navigate(['account-profile']).then(() => this.opened = false);
  }
}
