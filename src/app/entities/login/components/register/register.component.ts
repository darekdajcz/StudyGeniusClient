import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService, UserModel } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthRole } from '../models/auth-role';
import { finalize } from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { LoginComponent } from '../../login.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./../../login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  protected readonly AuthRole = AuthRole;

  signUpForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: [AuthRole.STUDENT, [Validators.required]]
  });

  constructor(private readonly fb: NonNullableFormBuilder, private readonly authService: AuthService,
    private readonly router: Router, private readonly tokenStorageService: TokenStorageService) {
  }

  get firstnameControl(): FormControl<string> {
    return this.signUpForm.controls.firstname;
  }

  get lastnameControl(): FormControl<string> {
    return this.signUpForm.controls.lastname;
  }

  get emailControl(): FormControl<string> {
    return this.signUpForm.controls.email;
  }

  get passwordControl(): FormControl<string> {
    return this.signUpForm.controls.password;
  }

  get roleControl(): FormControl<AuthRole> {
    return this.signUpForm.controls.role;
  }

  onSubmit() {
    const registerUser = { ...this.signUpForm.value } as RegisterRequest;
    this.authService.register(registerUser)
      .pipe(finalize(() => this.router.navigate(['/login'])))
      .subscribe(
        {
          next: (res) => {
            if (res.access_token) {

              this.tokenStorageService.saveToken(res.access_token!);
              this.tokenStorageService.saveUser(res.user);
              this.router.navigate(['/']).then(() => LoginComponent.reloadPage());
            }
          }
        }
      );
  }
}