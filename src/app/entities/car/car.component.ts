import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarCriteria, CarService } from './car.service';
import { filter, finalize, Observable, take } from 'rxjs';
import { CarModel } from './model/car.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UpdateCarResponse } from './model/update-car-response';
import { Pagination } from '../../shared/util/request-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarsResponse } from './model/cars-response';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { CarEditModalComponent } from './components/car-edit-modal/car-edit-modal.component';

@Component({
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  faSort = faSort;
  totalElements: number;
  cars: CarModel[] = [];
  predicate = 'model';
  ascending = true;
  showSearchBox = false;
  page = 0;

  limit = 10;
  offset = 0;
  dir = 'DESC';

  carSearchForm = this.fb.group({
    mark: '',
    model: '',
    engine_capacity: '',
    color: '',
    gearbox_type: null,
    car_type: '',
    price_per_day: null
  });


  constructor(private readonly carService: CarService, private readonly cdRef: ChangeDetectorRef,
              private readonly modal: NgbModal, private readonly tokenService: TokenStorageService,
              private readonly spinner: NgxSpinnerService, private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initData();
  }

  canEdit(): boolean {
    return true;
  }

  deleteCar($event: number): void {

    const deleteId = $event;

    const modal = ConfirmDialogComponent.open(this.modal, 'cancel.car');

    modal.closed
      .pipe(take(1),
        filter((res) => res))
      .subscribe({ next: () => this.confirmDeleteClient(deleteId) });
  }

  detailsCar(client: CarModel): void {
    this.updateCar(client, true);
  }

  updateCar(car?: CarModel, details = false): void {
    const modal = CarEditModalComponent.open(this.modal, car, details);

    modal.closed
      .pipe(take(1),
        filter((res) => !!res))
      .subscribe({ next: ({ car }) => this.saveClient(car) });
  }

  private confirmDeleteClient(id: number): void {
    this.carService.deleteCar(id)
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  private saveClient(req: CarModel): void {
    let observable: Observable<UpdateCarResponse> = req?.id ? this.carService.updateCar(req) : this.carService.createCar(req);
    observable
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  loadAll(isClear = false): void {
    if (isClear) {
      this.clear();
    }

    const carCriteria = { ...this.carSearchForm.value } as CarCriteria;

    const page = {
      limit: this.limit,
      offset: this.offset,
      sort: this.predicate,
      dir: this.ascending ? 'DESC' : 'ASC'
    } as Pagination;

    this.carService.getAllCars(carCriteria, page)
      .pipe(
        filter((res) => res.success),
        finalize(() => this.cdRef.detectChanges())
      )
      .subscribe({
        next: (res) => this.paginateCars(res),
        error: () => this.spinner.hide()
      });
  }

  reload(): void {
    this.spinner.show().then(() => this.loadAll(true));
  }

  reset(): void {
    this.spinner.show().then(() => {
      this.carSearchForm.reset();
      this.clear();
      this.loadAll();
    });
  }

  clear(): void {
    this.page = 0;
    this.cars = [];
  }

  previousPage(): void {
    this.spinner.show().then(() => {
      this.page = --this.page;
      this.offset = this.page * this.limit;
      this.loadAll();
    });
  }

  nextPage(nextPage?: number): void {
    this.spinner.show().then(() => {
      this.page = !nextPage ? ++this.page : this.page + 2;
      this.offset = this.page * this.limit;
      this.loadAll();
    });
  }

  search(): void {
    this.spinner.show().then(() => {
      this.loadAll(true);
    });
  }

  onSearchKey(): void {
    // this.searchTermChanged.next(this.carCriteria.subject);
  }

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
    if (!this.showSearchBox) {
      this.spinner.show().then(() => this.reset());
    }
  }

  private paginateCars(carsResponse: CarsResponse): void {
    // if (carsResponse) {
    this.totalElements = carsResponse.count;
    //   this.lastPage = carsResponse.count / this.limit
    if (carsResponse.data) {
      this.cars = carsResponse.data;
    }
    // }
    // this.cdRef.detectChanges()
    this.spinner.hide();
  }

  private initFullTextSearchDebounce(): void {
    // this.searchTermChanged
    //   .pipe(debounceTime(DEBOUNCE_TIMEOUT), distinctUntilChanged(), untilDestroyed(this))
    //   .subscribe(() =>
    //     this.spinner.show().then(() => this.loadAll(true))
    //   );
  }


  private initData(): void {
    this.loadAll();
    this.initFullTextSearchDebounce();
  }

  isNextPageDisabled(): boolean {
    return this.totalElements < (this.page + 1) * this.limit;
  }
}
