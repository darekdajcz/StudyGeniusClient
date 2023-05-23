import { inject, Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorsResponse } from './model/tutors-response';
import { UpdateTutorResponse } from './model/update-tutor-response';
import { DeleteResponse } from './model/delete-response';
import { createRequestOption, Pagination } from '../../shared/util/request-util';
import { AddTutorRequest } from './model/add-tutor-request';
import { UpdateTutorRequest } from './model/update-tutor-request';
import { TutorDetailModel, TutorModel } from './model/tutor.model';

export interface TutorCriteria {
  id?: number | null;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  subject: string | null;
  description?: string | null;
  prize?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private resourceUrl = `${ SERVER_API_URL }/api/tutor`;
  private readonly http = inject(HttpClient);

  getAllTutors = (tutorsCriteria: TutorCriteria, pageable?: Pagination | null, getAll = false): Observable<TutorsResponse> => {
    let params = {};
    if (!!pageable && !getAll) {
      params = createRequestOption(pageable);
    }

    return this.http.post<TutorsResponse>(`${ this.resourceUrl }/list`, tutorsCriteria, { params });
  };

  getTutorById = (id: number): Observable<TutorDetailModel> => {
    return this.http.get<TutorDetailModel>(`${ this.resourceUrl }/${ id }`);
  };

  getTutorByUserId = (id: number): Observable<TutorModel> => {
    return this.http.get<TutorModel>(`${ this.resourceUrl }/user/${ id }`);
  };

  createTutor = (req: Omit<TutorModel, 'id'>): Observable<UpdateTutorResponse> => {
    const addRequest = { tutorDTO: req } as AddTutorRequest;
    return this.http.post<UpdateTutorResponse>(`${ this.resourceUrl }`, addRequest);
  };

  updateTutor = (req: TutorModel): Observable<UpdateTutorResponse> => {
    const updateRequest = { tutorDTO: req } as UpdateTutorRequest;
    return this.http.put<UpdateTutorResponse>(`${ this.resourceUrl }/${ req.id }`, updateRequest);
  };

  deleteTutor = (id: number): Observable<DeleteResponse> =>
    this.http.delete<DeleteResponse>(`${ this.resourceUrl }/${ id }`);

  createReservation(req: TutorModel): Observable<any> {
    const addRequest = { tutorDTO: req } as AddTutorRequest;
    return this.http.post<UpdateTutorResponse>(`${ this.resourceUrl }`, addRequest);
  }
}
