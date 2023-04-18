import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import { RouterModule } from '@angular/router';
import { carRoute } from './car.route';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { CarEditModalComponent } from './components/car-edit-modal/car-edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CarComponent,
    CarEditModalComponent,
    CarFilterComponent
  ],
  imports: [
    RouterModule.forChild(carRoute),
    CommonModule,
    MatButtonModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonToggleModule,
    FontAwesomeTestingModule,
    InfiniteScrollModule,
    MatSelectModule
  ]
})
export class CarModule { }
