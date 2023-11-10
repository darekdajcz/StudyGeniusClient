import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TutorService } from '../../tutor/tutor.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { ChartType } from 'chart.js';
import { UserModel } from '../../../shared/services/auth.service';
import { finalize } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './tutor-stats.component.html',
  styleUrls: ['./tutor-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgChartsModule,
    NgIf,
    MatButtonModule,
    RouterLink
  ],
  standalone: true
})
export class TutorStatsComponent implements OnInit {
  @ViewChild(BaseChartDirective) barChart: BaseChartDirective;
  user: UserModel;

  tutorMap = new Map<string, number>();

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
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private readonly tokenStorageService: TokenStorageService, private readonly translateService: TranslateService,
    private readonly tutorService: TutorService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.tutorService.getTutorStats()
      .pipe(finalize(() => {
        this.barChartLabels = [...this.tutorMap.keys()].map(res =>
          this.translateService.instant(`tutor.subject.${ res }`));
        const dataX = [...this.tutorMap.values()];
        this.barChartData.push({
          data: dataX,
          label: this.translateService.instant('tutor.mark'),
          backgroundColor: '#3B60A6D1'
        });
        this.barChart?.update();
        this.toggleOpen();
        this.cdRef.detectChanges();
      }))
      .subscribe(
        {
          next: (res) => {
            res.tutorStats.forEach((tutor) => {
              if (!this.tutorMap.size || !this.tutorMap.has(tutor.subject)) {
                this.tutorMap.set(tutor.subject, 1);
              } else {
                this.tutorMap.set(tutor.subject, (this.tutorMap.get(tutor.subject)! + 1));
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
