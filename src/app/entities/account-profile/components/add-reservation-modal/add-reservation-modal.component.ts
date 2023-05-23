import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadgesEnum, PlaceEnum, TutorModel } from '../../../tutor/model/tutor.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, WeekDay } from '@angular/common';
import { DaysEnum } from '../../../tutor/model/days.enum';

@Component({
  templateUrl: './add-reservation-modal.component.html',
  styles: [`.modal-body {
      max-height: 70vh;
      overflow-y: scroll;
  }`
  ],
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true
})
export class AddReservationModalComponent implements OnInit {

  tutorModel?: TutorModel;
  details = false;

  tutorForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    subject: ['', Validators.required],
    description: ['', Validators.required],
    place: [[PlaceEnum.TUTOR_PLACE], Validators.required],
    phoneNumber: ['', Validators.required],
    badges: [[BadgesEnum.STAR], Validators.required],
    price: [0, Validators.required],
    daysAvailable: [[DaysEnum.MONDAY], Validators.required],
    hoursAvailable: [[''], Validators.required]
  });

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder) {
  }

  static open(ngbModal: NgbModal, tutorModel?: TutorModel, details?: boolean): NgbModalRef {
    const modal = ngbModal.open(AddReservationModalComponent, {
      centered: true
    });

    modal.componentInstance.tutorModel = tutorModel;
    modal.componentInstance.details = details;

    return modal;
  }

  get firstnameControl(): FormControl<string> {
    return this.tutorForm.controls.firstname as FormControl<string>;
  }

  get lastnameControl(): FormControl<string> {
    return this.tutorForm.controls.lastname as FormControl<string>;
  }

  get emailControl(): FormControl<string> {
    return this.tutorForm.controls.email as FormControl<string>;
  }

  get subjectControl(): FormControl<string> {
    return this.tutorForm.controls.subject as FormControl<string>;
  }

  get descriptionControl(): FormControl<string> {
    return this.tutorForm.controls.description as FormControl<string>;
  }

  get placeControl(): FormControl<PlaceEnum[]> {
    return this.tutorForm.controls.place as FormControl<PlaceEnum[]>;
  }

  get phoneNumberControl(): FormControl<string> {
    return this.tutorForm.controls.phoneNumber as FormControl<string>;
  }

  get badgesControl(): FormControl<BadgesEnum[]> {
    return this.tutorForm.controls.badges as FormControl<BadgesEnum[]>;
  }

  get priceControl(): FormControl<number | null> {
    return this.tutorForm.controls.price as FormControl<number | null>;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDismiss(): void {
    this.activeModal.close();
  }

  private initForm(): void {
    const { tutorModel } = this;
    if (this.tutorModel) {
      this.tutorForm.patchValue({
        firstname: tutorModel!.firstname || '',
        lastname: tutorModel!.lastname || '',
        email: tutorModel!.email || '',
        subject: tutorModel!.subject,
        description: tutorModel!.description || '',
        price: tutorModel!.price || 0,
        place: tutorModel!.place,
        phoneNumber: tutorModel!.phoneNumber || '',
        badges: tutorModel!.badges,
        daysAvailable: tutorModel!.daysAvailable,
        hoursAvailable: ['']
      });
    }

    if (this.details) {
      this.tutorForm.disable();
    }
  }

  saveTutor(): void {
    const tutor = {
      ...this.tutorForm.getRawValue(),
      id: this.tutorModel?.id,
      badges: [BadgesEnum.APPROVED],
      place: [PlaceEnum.STUDENT_PLACE],
      reservations: []
    } as TutorModel;

    this.activeModal.close({ tutor });
  }
}
