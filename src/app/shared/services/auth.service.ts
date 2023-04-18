import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { Observable, of, switchMap } from 'rxjs';
import { LoginModel } from '../../entities/login/models/login.model';
import { LoginResponse } from '../../entities/login/models/login.response';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private resourceUrl = `${ SERVER_API_URL }/user`;

  constructor(private readonly http: HttpClient) {
  }

  logIn(loginModel: LoginModel, nonce?: string): Observable<LoginResponse> {
    let req;
    if (!nonce) {
      req = { login: loginModel.login };
    } else {
      const passwordX = sha256(`${ sha256(loginModel.password) }${ nonce }`);
      req = { login: loginModel.login, password: passwordX.toLowerCase() };
    }
    return this.http.post<LoginResponse>(`${ this.resourceUrl }/login`, req)
      .pipe(switchMap((res) => !nonce ? this.logIn(loginModel, res.nonce) : of(res)));
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${ this.resourceUrl }/logout`, {});
  }
}
