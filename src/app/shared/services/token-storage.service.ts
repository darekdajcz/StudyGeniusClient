import { Injectable } from '@angular/core';
import { User } from '../../entities/login/models/user';

const ACCESS_KEY = 'accessToken';
const USER_KEY = 'auth-user';
const LNG_KEY = 'lng';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveLang(lng: string): void {
    window.sessionStorage.setItem(LNG_KEY, lng);
  }

  getLang(): string {
    return sessionStorage.getItem(LNG_KEY)!;
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_KEY);
    window.sessionStorage.setItem(ACCESS_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(ACCESS_KEY)!;
  }

  saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }
}
