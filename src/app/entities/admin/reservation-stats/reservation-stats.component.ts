import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { UserModel } from '../../../shared/services/auth.service';
import { ChartType } from 'chart.js';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { TutorService } from '../../tutor/tutor.service';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './reservation-stats.component.html',
  styleUrls: ['./reservation-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    NgChartsModule,
    NgIf
  ],
  standalone: true
})
export class ReservationStatsComponent implements OnInit {

  @ViewChild(BaseChartDirective) barChart: BaseChartDirective;
  user: UserModel;

  reservationMap = new Map<string, number>();

  barLoaded = false;

  barChartOptions: any = {
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 1000,
    scaleValuePaddingY: 1000,
    plugins: {
      labels: {
        render: 'value'
      }
    },
    title: {
      display: true, text: 'Current Subject Status',
      fontSize: 20,
      color: 'black'
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  barChartLabels: string[] = [];
  barChartData: any[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;

  constructor(private readonly tokenStorageService: TokenStorageService, private readonly translateService: TranslateService,
    private readonly tutorService: TutorService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.tutorService.getReservationStats()
      .pipe(finalize(() => {
        console.log(this.reservationMap);
        this.barChartLabels = [...this.reservationMap.keys()];
        const dataX = [...this.reservationMap.values()];
        this.barChartData.push({
          data: dataX,
          label: this.translateService.instant('reservation.place'),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        });
        this.barChart?.update();
        this.toggleOpen();
        this.cdRef.detectChanges();
      }))
      .subscribe(
        {
          next: (res) => {
            res.reservationStats.forEach((reservation) => {
              if (!this.reservationMap.size || !this.reservationMap.has(reservation.place)) {
                this.reservationMap.set(reservation.place, 1);
              } else {
                this.reservationMap.set(reservation.place, (this.reservationMap.get(reservation.place)! + 1));
              }
            });
          }
        }
      );
  }

  toggleOpen(): void {
    this.barLoaded = !this.barLoaded;
  }

}
