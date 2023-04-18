import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly tokenStorageService = inject(TokenStorageService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.tokenStorageService.getToken();

    if (token != null) {
      const headers = new HttpHeaders({ 'Authorization':  token, });

      authReq = request.clone({ headers });
    }

    return next.handle(authReq);
  }
}
