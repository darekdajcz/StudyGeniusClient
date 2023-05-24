import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TutorModel } from '../../../tutor/model/tutor.model';
import { filter, map, Observable, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';
import { UpdateTutorResponse } from '../../../tutor/model/update-tutor-response';
import { TutorService } from '../../../tutor/tutor.service';
import { UserModel } from '../../../../shared/services/auth.service';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Reservation, ReservationListResponse } from '../../../tutor/model/reservation-response';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgForOf,
    JsonPipe,
    AsyncPipe
  ],
  standalone: true
})
export class StudentLessonsComponent implements OnInit {

  user: UserModel;
  reservations$: Observable<Reservation[]>;

  constructor(private readonly modal: NgbModal, private readonly tutorService: TutorService,
    private readonly tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.reservations$ = this.tutorService
      .getStudentReservations(this.user.id)
      .pipe(map((res) => res.reservations));
  }
}
