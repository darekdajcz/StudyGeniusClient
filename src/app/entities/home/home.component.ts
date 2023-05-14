import {ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {User} from '../login/models/user';
import {ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {TutorService} from '../car/tutor.service';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, UserModel} from "../../shared/services/auth.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) barChart: BaseChartDirective;
  user: UserModel;
  carsMap = new Map<string, number>();
  barLoaded = false;
  private readonly authService = inject(AuthService)

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


  constructor(private readonly tokenStorageService: TokenStorageService, private readonly carService: TutorService
    , private readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    // this.carService.getAllCars({}, null, true)
    //   .pipe(finalize(() => {
    //     this.barChartLabels = [...this.carsMap.keys()];
    //     const dataX = [...this.carsMap.values()];
    //     this.barChartData.push({
    //       data: dataX,
    //       label: this.translateService.instant('car.mark'),
    //       backgroundColor: '#455a64'
    //     });
    //     this.barChart?.update();
    //   }))
    //   .subscribe(
    //     {
    //       next: (res) => {
    //         res.data.forEach((car) => {
    //           if (!this.carsMap.size || !this.carsMap.has(car.mark)) {
    //             this.carsMap.set(car.mark, 1);
    //           } else {
    //             this.carsMap.set(car.mark, (this.carsMap.get(car.mark)! + 1));
    //           }
    //         });
    //       }
    //     }
    //   );
  }

  toggleOpen(): void {
    // this.barLoaded = !this.barLoaded;
    this.authService.tutorList().subscribe()
  }
}
