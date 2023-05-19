import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TutorCriteria, TutorService } from './tutor.service';
import { filter, finalize, Observable, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UpdateTutorResponse } from './model/update-tutor-response';
import { Pagination } from '../../shared/util/request-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { TutorsResponse } from './model/tutors-response';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { TutorEditModalComponent } from './components/tutor-edit-modal/tutor-edit-modal.component';
import { Router } from '@angular/router';
import { AuthRole } from '../login/components/models/auth-role';
import { TutorModel } from './model/tutor.model';

@Component({
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorComponent implements OnInit {
  faSort = faSort;
  totalElements: number;
  tutors: TutorModel[] = [];
  predicate = 'id';
  ascending = false;
  showSearchBox = false;
  page = 0;

  limit = 5;
  offset = 0;
  dir = 'DSC';

  tutorSearchForm = this.fb.group({
    firstname: null,
    lastname: null,
    email: null,
    subject: null,
    description: null,
    price: null
  });

  readonly sortArr = ['id', 'lastname', 'subject', 'price'];

  constructor(private readonly tutorService: TutorService, private readonly cdRef: ChangeDetectorRef,
    private readonly modal: NgbModal, private readonly tokenService: TokenStorageService,
    private readonly spinner: NgxSpinnerService, private readonly fb: FormBuilder,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initData();
  }

  canEdit(): boolean {
    return this.tokenService.getUser().role !== AuthRole.STUDENT;
  }

  deleteTutor($event: number): void {

    const deleteId = $event;

    const modal = ConfirmDialogComponent.open(this.modal, 'cancel.tutor');

    modal.closed
      .pipe(take(1),
        filter((res) => res))
      .subscribe({ next: () => this.confirmDeleteClient(deleteId) });
  }

  detailsTutor(client: TutorModel): void {
    this.updateTutor(client, true);
  }

  updateTutor(tutor?: TutorModel, details = false): void {
    const modal = TutorEditModalComponent.open(this.modal, tutor, details);

    modal.closed
      .pipe(take(1),
        filter((res) => !!res))
      .subscribe({ next: ({ tutor }) => this.saveClient(tutor) });
  }

  private confirmDeleteClient(id: number): void {
    this.tutorService.deleteTutor(id)
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  private saveClient(req: TutorModel): void {
    let observable: Observable<UpdateTutorResponse> = req?.id
      ? this.tutorService.updateTutor(req)
      : this.tutorService.createTutor(req);

    observable
      .pipe(filter((res) => res.success))
      .subscribe({ next: () => this.loadAll() });
  }

  loadAll(isClear = false): void {
    if (isClear) {
      this.clear();
    }

    const tutorCriteria = { ...this.tutorSearchForm.value } as TutorCriteria;
    console.log(this.tutorSearchForm.value);
    console.log(tutorCriteria);

    const page = {
      limit: this.limit,
      offset: this.offset,
      sort: this.predicate,
      dir: this.ascending ? 'DESC' : 'ASC'
    } as Pagination;

    this.tutorService.getAllTutors(tutorCriteria, page)
      .pipe(
        filter((res) => res.success),
        finalize(() => this.cdRef.detectChanges())
      )
      .subscribe({
        next: (res) => this.paginateTutors(res),
        error: () => this.spinner.hide()
      });
  }

  reload(): void {
    this.spinner.show().then(() => this.loadAll(true));
  }

  reset(): void {
    this.spinner.show().then(() => {
      this.tutorSearchForm.reset();
      this.clear();
      this.loadAll();
    });
  }

  clear(): void {
    this.page = 0;
    this.tutors = [];
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

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
    if (!this.showSearchBox) {
      this.spinner.show().then(() => this.reset());
    }
  }

  private paginateTutors(tutorsResponse: TutorsResponse): void {
    // if (tutorsResponse) {
    this.totalElements = tutorsResponse.count;
    //   this.lastPage = tutorsResponse.count / this.limit
    if (tutorsResponse.data) {
      this.tutors = tutorsResponse.data;
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

  reservationSection(id: number) {
    this.router.navigate(['tutor-profile', id])
  }
}
