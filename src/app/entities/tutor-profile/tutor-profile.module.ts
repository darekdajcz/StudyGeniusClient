import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorProfileComponent } from './tutor-profile.component';
import { RouterModule } from '@angular/router';
import { tutorProfileRoute } from './tutor-profile.route';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    TutorProfileComponent
  ],
  imports: [
    RouterModule.forChild(tutorProfileRoute),
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class TutorProfileModule { }
