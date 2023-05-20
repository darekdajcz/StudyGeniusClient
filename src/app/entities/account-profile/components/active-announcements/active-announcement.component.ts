import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TutorModel } from '../../../tutor/model/tutor.model';
import { filter, Observable, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';
import { UpdateTutorResponse } from '../../../tutor/model/update-tutor-response';
import { TutorService } from '../../../tutor/tutor.service';

@Component({
  selector: 'app-active-announcements',
  templateUrl: './active-announcement.component.html',
  styleUrls: ['./active-announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  standalone: true
})
export class ActiveAnnouncementComponent {

  constructor(private readonly modal: NgbModal, private readonly tutorService: TutorService) {
  }

  addAnnouncement(tutor?: TutorModel, details = false): void {
    const modal = AddReservationModalComponent.open(this.modal, tutor, details);

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
