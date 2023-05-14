import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './tutor.component';
import { RouterModule } from '@angular/router';
import { tutorRoute } from './tutor.route';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { TutorEditModalComponent } from './components/car-edit-modal/tutor-edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TutorFilterComponent } from './components/car-filter/tutor-filter.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TutorComponent,
    TutorEditModalComponent,
    TutorFilterComponent
  ],
  imports: [
    RouterModule.forChild(tutorRoute),
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
export class TutorModule { }
