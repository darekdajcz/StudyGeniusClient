import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../shared/services/auth.service';
import { finalize, forkJoin, Observable, tap } from 'rxjs';
import { Reservation } from '../../../tutor/model/reservation-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TutorService } from '../../../tutor/tutor.service';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { AuthRole } from '../../../login/components/models/auth-role';
import { MatIconModule } from '@angular/material/icon';
import { TutorDetailModel } from '../../../tutor/model/tutor.model';
import { NgForOf, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-my-tutors-from-reservation',
  templateUrl: './my-tutors-from-reservation.component.html',
  styleUrls: ['./my-tutors-from-reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    NgForOf,
    NgIf,
    MatListModule
  ],
  standalone: true
})
export class MyTutorsFromReservationComponent implements OnInit {

  user: UserModel;
  AuthRole = AuthRole;
  reservations$: Observable<Reservation[]>;
  tutors: TutorDetailModel[] = [];

  constructor(private readonly modal: NgbModal, private readonly tutorService: TutorService,
    private readonly tokenService: TokenStorageService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();

    const arr: number[] = [];

    this.tutorService
      .getStudentReservations(this.user.id)
      .pipe(
        tap(
          (res) =>
            res.reservations.forEach((res) => {
              if (!arr.includes(res.tutorId)) {
                arr.push(res.tutorId);
              }
            })
        )
      ).subscribe({
      next: () => this.forkJoinTutors(arr)
    });
  }

  private forkJoinTutors(arr: number[]) {
    forkJoin(
      arr.map((res) =>
        this.tutorService.getTutorById(res))
    ).pipe(finalize(() => this.cdRef.detectChanges()))
      .subscribe({
        next: (res) => res.forEach((x) =>
          this.tutors.push(x))
      });
  }

}
