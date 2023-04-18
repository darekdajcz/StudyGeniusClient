import { inject, Injectable } from '@angular/core';
import { Alert, AlertType } from '../components/alert-messages/alert.model';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {
  private readonly alertSubject = new Subject<Alert>();
  private readonly defaultId = 'default-alert';
  private readonly translateService = inject(TranslateService);

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.alertSubject.asObservable()
  }

  success(message: string, params?: any): void {
    this.alert(new Alert({ type: AlertType.Success, message, params }));
  }

  error(message: string, params?: any): void {
    this.alert(new Alert({ type: AlertType.Error, message, params }));
  }

  info(message: string, params?: any): void {
    this.alert(new Alert({ type: AlertType.Info, message, params }));
  }

  alert(alert: Alert): void {
    alert.message = this.translateService.instant(alert.message, alert.params);
    alert.id = alert.id || this.defaultId;
    this.alertSubject.next(alert);
  }

  clear(id = this.defaultId): void {
    this.alertSubject.next(new Alert({ id }));
  }
}
