import { inject, Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthRole } from '../../entities/login/components/models/auth-role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private readonly authService = inject(TokenStorageService);
  private readonly router = inject(Router);

  canActivate(): boolean {
    if (this.authService.getUser().role === AuthRole.ADMIN) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
