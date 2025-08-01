import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../entities/login/components/models/auth-request.model';
import { RegisterRequest } from '../../entities/login/components/models/register-request';

export interface UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  createDate: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserModel;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private resourceUrl = `${ SERVER_API_URL }/api/auth`;

  constructor(private readonly http: HttpClient) {
  }

  logout = (): Observable<any> =>
    this.http.post<any>(`${ this.resourceUrl }/logout`, {});

  logIn = (authRequest: AuthRequest): Observable<AuthResponse> =>
    this.http.post<any>(`${ this.resourceUrl }/authenticate`, authRequest);

  register = (authRequest: RegisterRequest): Observable<AuthResponse> =>
    this.http.post<any>(`${ this.resourceUrl }/register`, authRequest);

  forApprove = (): Observable<any> =>
    this.http.get<any>(`${ this.resourceUrl }/for-approve`);
}
