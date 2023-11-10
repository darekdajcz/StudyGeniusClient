import { inject, Injectable } from '@angular/core';
import { CanLoad, Route, Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  private readonly authService = inject(TokenStorageService);
  private readonly router = inject(Router);

  canLoad(route: Route): boolean {
    if (!!this.authService.getUser()?.role) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
