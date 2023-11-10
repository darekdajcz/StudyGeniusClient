import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AlertMessagesService } from '../services/alert-messages.service';

@Injectable()
export class MessagesHandlerInterceptor implements HttpInterceptor {
  private readonly alertMessagesService = inject(AlertMessagesService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
          next: (event) => {
            if (event instanceof HttpResponse && event.body?.success && !event.body?.data?.length) {
              // this.alertMessagesService.info('success');
            }
          }
        }
      ));
  }
}
