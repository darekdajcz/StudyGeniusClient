import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject, Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TutorService } from '../../tutor/tutor.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, UserModel } from '../../../shared/services/auth.service';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) barChart: BaseChartDirective;
  user: UserModel;
  barLoaded = false;
  @Input() showClock = false;
  actualDateTime = new Date();
  idInterval: any;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(private readonly tokenStorageService: TokenStorageService, private readonly carService: TutorService
    , private readonly translateService: TranslateService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();

    this.idInterval = setInterval(() => {
      let { actualDateTime } = this;
      actualDateTime = new Date();
      this.hours = actualDateTime.getHours();
      this.minutes = actualDateTime.getMinutes();
      this.seconds = actualDateTime.getSeconds();
      this.cdRef.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('Clock Component is detroy');
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  toggleOpen(): void {
    this.barLoaded = !this.barLoaded;
  }
}
