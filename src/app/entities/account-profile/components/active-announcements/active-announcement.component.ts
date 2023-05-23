import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TutorModel } from '../../../tutor/model/tutor.model';
import { filter, Observable, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';
import { UpdateTutorResponse } from '../../../tutor/model/update-tutor-response';
import { TutorService } from '../../../tutor/tutor.service';
import { UserModel } from '../../../../shared/services/auth.service';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-active-announcements',
  templateUrl: './active-announcement.component.html',
  styleUrls: ['./active-announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true
})
export class ActiveAnnouncementComponent implements OnInit {

  user: UserModel;
  tutor: TutorModel;

  constructor(private readonly modal: NgbModal, private readonly tutorService: TutorService,
    private readonly tokenService: TokenStorageService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.tutorService
      .getTutorByUserId(this.user.id)
      .pipe(filter((tutor) => !!tutor))
      .subscribe({
        next: (tutor) => {
          this.tutor = tutor;
          this.cdRef.detectChanges();
        }
      });
  }

  addAnnouncement(): void {
    const tutor = this.tutor || null;
    const modal = AddReservationModalComponent.open(this.modal, tutor);

    modal.closed
      .pipe(take(1),
        filter((res) => !!res))
      .subscribe({
        next: ({ tutor }) => this.saveAnnouncement(tutor)
      });
  }

  private saveAnnouncement(req: TutorModel): void {
    let observable: Observable<UpdateTutorResponse> = req?.id
      ? this.tutorService.updateTutor(req)
      : this.tutorService.createReservation(req);

    observable
      .pipe(filter((res) => res.success))
      .subscribe({ next: () => 'this.loadAll()' });
  }
}
