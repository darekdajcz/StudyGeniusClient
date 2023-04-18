import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarModel, CarType, ChestType } from '../../model/car.model';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './car-edit-modal.component.html',
  styles: [`.modal-body { max-height: 70vh; overflow-y: scroll; }`]
})
export class CarEditModalComponent {

  carModel?: CarModel;
  details = false;
  ChestType = ChestType;
  CarType = CarType;

  carForm = this.fb.group({
    mark: ['', [Validators.required]],
    model: ['', [Validators.required]],
    engine_capacity: ['', [Validators.required]],
    color: ['', [Validators.required]],
    gearbox_type: '',
    car_type: '',
    price_per_day: 0,
    tenant_id: [0, [Validators.required]]
  });

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder) {
  }

  static open(ngbModal: NgbModal, carModel?: CarModel, details?: boolean): NgbModalRef {
    const modal = ngbModal.open(CarEditModalComponent, {
      centered: true
    });

    modal.componentInstance.carModel = carModel;
    modal.componentInstance.details = details;

    return modal;
  }

  get markControl(): FormControl<string> {
    return this.carForm.controls.mark;
  }

  get modelControl(): FormControl<string> {
    return this.carForm.controls.model;
  }

  get engine_capacityControl(): FormControl<string> {
    return this.carForm.controls.engine_capacity;
  }

  get colorControl(): FormControl<string> {
    return this.carForm.controls.color;
  }

  get gearbox_typeControl(): FormControl<string> {
    return this.carForm.controls.gearbox_type;
  }

  get car_typeControl(): FormControl<string> {
    return this.carForm.controls.car_type;
  }

  get price_per_dayControl(): FormControl<number> {
    return this.carForm.controls.price_per_day;
  }

  get tenant_idControl(): FormControl<number> {
    return this.carForm.controls.tenant_id;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDismiss(): void {
    this.activeModal.close();
  }

  private initForm(): void {
    if (this.carModel) {
      this.carForm.patchValue({
        mark: this.carModel.mark || '',
        model: this.carModel.model || '',
        engine_capacity: this.carModel.engine_capacity || '',
        color: this.carModel.color || '',
        gearbox_type: this.carModel.gearbox_type || ChestType.MANUAL,
        car_type: this.carModel.car_type || '',
        price_per_day: this.carModel.price_per_day || 0,
        tenant_id: this.carModel.tenant_id || 0
      });
    }

    if (this.details) {
      this.carForm.disable();
    }
  }

  saveCar(): void {
    const car = { ...this.carForm.getRawValue(), id: this.carModel?.id } as CarModel;

    this.activeModal.close({ car });
  }
}
