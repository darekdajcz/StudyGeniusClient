import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TutorModel, ChestType, TutorType} from '../../model/tutor.model';
import {FormControl, NonNullableFormBuilder} from '@angular/forms';

@Component({
  templateUrl: './tutor-edit-modal.component.html',
  styles: [`.modal-body {
    max-height: 70vh;
    overflow-y: scroll;
  }`]
})
export class TutorEditModalComponent implements OnInit {

  tutorModel?: TutorModel;
  details = false;
  ChestType = ChestType;
  TutorType = TutorType;

  tutorForm = this.fb.group({
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
    description: '',
    price: 0
  });

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder) {
  }

  static open(ngbModal: NgbModal, tutorModel?: TutorModel, details?: boolean): NgbModalRef {
    const modal = ngbModal.open(TutorEditModalComponent, {
      centered: true
    });

    modal.componentInstance.tutorModel = tutorModel;
    modal.componentInstance.details = details;

    return modal;
  }

  get firstnameControl(): FormControl<string> {
    return this.tutorForm.controls.firstname;
  }

  get lastnameControl(): FormControl<string> {
    return this.tutorForm.controls.lastname;
  }

  get emailControl(): FormControl<string> {
    return this.tutorForm.controls.email;
  }

  get subjectControl(): FormControl<any> {
    return this.tutorForm.controls.subject;
  }

  get descriptionControl(): FormControl<string> {
    return this.tutorForm.controls.description;
  }

  get priceControl(): FormControl<any> {
    return this.tutorForm.controls.price;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDismiss(): void {
    this.activeModal.close();
  }

  private initForm(): void {
    if (this.tutorModel) {
      this.tutorForm.patchValue({
        firstname: this.tutorModel.firstname || '',
        lastname: this.tutorModel.lastname || '',
        email: this.tutorModel.email || '',
        subject: this.tutorModel.subject,
        description: this.tutorModel.description || ChestType.MANUAL,
        price: this.tutorModel.price || 0
      });
    }

    if (this.details) {
      this.tutorForm.disable();
    }
  }

  saveTutor(): void {
    const tutor = {...this.tutorForm.getRawValue(), id: this.tutorModel?.id} as TutorModel;

    this.activeModal.close({tutor});
  }
}
