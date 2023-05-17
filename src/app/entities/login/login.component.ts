import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {filter} from 'rxjs';
import {Router} from '@angular/router';
import {AuthRequest} from "./components/models/auth-request.model";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private readonly fb: NonNullableFormBuilder, private readonly authService: AuthService,
              private readonly tokenStorageService: TokenStorageService, private readonly router: Router) {
  }

  get emailControl(): FormControl<string> {
    return this.loginForm.controls.email;
  }

  get passwordControl(): FormControl<string> {
    return this.loginForm.controls.password;
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const authRequest = {...this.loginForm.value} as AuthRequest;
    this.authService.logIn(authRequest)
      .pipe(filter((res) => !!res))
      .subscribe({
        next: (res) => {
          if (res.access_token) {
            this.tokenStorageService.saveToken(res.access_token!);
            this.tokenStorageService.saveUser(res.user!);
            this.router.navigate(['/']).then(() => LoginComponent.reloadPage());
          }
        }
      });
  }

  static reloadPage(): void {
    window.location.reload();
  }
}
