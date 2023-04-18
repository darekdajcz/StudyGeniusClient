import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { filter } from 'rxjs';
import { LoginModel } from './models/login.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;

  loginForm = this.fb.group({
    login: [''],
    password: ['']
  });

  constructor(private readonly fb: NonNullableFormBuilder, private readonly authService: AuthService,
              private readonly tokenStorageService: TokenStorageService, private readonly router: Router) {
  }

  get loginControl(): FormControl<string> {
    return this.loginForm.controls.login;
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
    const loginValues = { ...this.loginForm.value } as LoginModel;
    this.authService.logIn(loginValues)
      .pipe(filter((res) => !!res))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.tokenStorageService.saveToken(res.token!);
            this.tokenStorageService.saveUser(res.user_data!);
            this.router.navigate(['/']).then(()=> LoginComponent.reloadPage());
          }
        }
      });
  }

  private static reloadPage(): void {
    window.location.reload();
  }
}
