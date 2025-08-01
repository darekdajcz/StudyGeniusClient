import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertMessagesService } from '../../services/alert-messages.service';
import { Alert, AlertType } from './alert.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-alert-messages',
  templateUrl: 'alert-messages.component.html',
  styleUrls: ['alert-messages.component.scss']
})
export class AlertMessagesComponent implements OnInit {

  @Input() id = 'default-alert';
  @Input() fade = true;

  @ViewChild('alertBox', { static: false }) alertBox?: ElementRef;

  alerts: Alert[] = [];

  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  hovered = false;

  constructor(private readonly router: Router, private readonly alertMessagesService: AlertMessagesService) {
  }

  ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertMessagesService.onAlert(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(alert => {
        console.log('x')
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events
      .pipe(untilDestroyed(this))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.alertMessagesService.clear(this.id);
        }
      });
  }

  removeAlert(alert: Alert): void {
    if (!this.alerts.includes(alert)) {
      return;
    }

    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert): string | undefined {
    if (!alert) {
      return undefined;
    }

    const classes = ['alert'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-error',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    };

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }

  onMouseOver(): void {
    this.hovered = true;
  }

  onMouseOut(): void {
    this.hovered = false;
  }
}
