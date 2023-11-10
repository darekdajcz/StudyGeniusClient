import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadgesEnum, PlaceEnum, TutorModel } from '../../../tutor/model/tutor.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe, NgForOf, NgIf, WeekDay } from '@angular/common';
import { DaysEnum } from '../../../tutor/model/days.enum';
import { TokenStorageService } from '../../../../shared/services/token-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { SubjectEnum } from '../../../tutor/model/subject.enum';
import { HoursEnum } from '../../../tutor/model/hours.enum';

@Component({
  templateUrl: './add-reservation-modal.component.html',
  styles: [`
      .modal-body {
          max-height: 70vh;
          overflow-y: scroll;
      }`
  ],
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
    NgForOf,
    JsonPipe
  ],
  standalone: true
})
export class AddReservationModalComponent implements OnInit {

  tutorModel?: TutorModel;
  details = false;

  days = Object.keys(DaysEnum);
  hours = Object.keys(HoursEnum);
  places = Object.keys(PlaceEnum);
  subjects = Object.keys(SubjectEnum);

  tutorForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    subject: [SubjectEnum.ART, Validators.required],
    description: ['', Validators.required],
    place: [[PlaceEnum.TUTOR_PLACE], Validators.required],
    phoneNumber: ['', Validators.required],
    badges: [[BadgesEnum.STAR], Validators.required],
    price: [0, Validators.required],
    daysAvailable: [[DaysEnum.MONDAY], Validators.required],
    hoursAvailable: [[''], Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
  });

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder,
    private readonly tokenService: TokenStorageService) {
  }

  static open(ngbModal: NgbModal, tutorModel?: TutorModel, details?: boolean): NgbModalRef {
    const modal = ngbModal.open(AddReservationModalComponent, {
      size: 'xl',
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

  get subjectControl(): FormControl<SubjectEnum> {
    return this.tutorForm.controls.subject as FormControl<SubjectEnum>;
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

  get hoursAvailableControl(): FormControl<string[] | null> {
    return this.tutorForm.controls.hoursAvailable as FormControl<string[] | null>;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDismiss(): void {
    this.activeModal.close();
  }

  private initForm(): void {

    const withoutBrackets = this.tutorModel!.hoursAvailable.slice(1, -1) as string;
    const hoursAvailable = withoutBrackets.split(', ');

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
        hoursAvailable: hoursAvailable,
        postalCode: tutorModel!.postalCode,
        city: tutorModel!.city,
        street: tutorModel!.street,
        houseNumber: tutorModel!.houseNumber
      });
    }

    if (this.details) {
      this.tutorForm.disable();
    }
  }

  saveTutor(): void {

    const string = '[' + this.hoursAvailableControl.value!.map(item => `${item}`).join(', ') + ']';

    const tutor = {
      ...this.tutorForm.getRawValue(),
      id: this.tutorModel?.id,
      userId: this.tokenService.getUser().id,
      badges: [BadgesEnum.APPROVED],
      hoursAvailable: string
    } as TutorModel;

    this.activeModal.close({ tutor });
  }
}
