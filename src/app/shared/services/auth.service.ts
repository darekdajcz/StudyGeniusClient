import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Observable, of, switchMap} from 'rxjs';
import {LoginResponse} from '../../entities/login/models/login.response';
import {sha256} from 'js-sha256';
import {AuthRequest} from "../../entities/login/models/auth-request.model";

export interface UserModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
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
  private resourceUrl = `${SERVER_API_URL}/api/auth`;

  constructor(private readonly http: HttpClient) {
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.resourceUrl}/logout`, {});
  }

  tutorList(): Observable<any> {
    const req = {
      userId: "2",
      subject: "IT",
      description: "informatyka, programowanie",
      price: 150
    }
    return this.http.get<any>(`${SERVER_API_URL}/api/tutor`);
  }

  logIn = (authRequest: AuthRequest): Observable<AuthResponse> => {
    const req = {
      email: "darek.dajcz@gmail.com",
      password: "Uzi2115"
    };
    return this.http.post<any>(`${this.resourceUrl}/authenticate`, authRequest);
  }
}
