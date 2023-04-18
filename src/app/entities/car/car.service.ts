import { inject, Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from './model/car.model';
import { CarsResponse } from './model/cars-response';
import { UpdateCarResponse } from './model/update-car-response';
import { DeleteResponse } from './model/delete-response';
import { createRequestOption, Pagination } from '../../shared/util/request-util';

export interface CarCriteria {
  id?: number;
  mark?: string;
  model?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private resourceUrl = `${ SERVER_API_URL }/car`;
  private readonly http = inject(HttpClient);

  getAllCars = (carsCriteria: CarCriteria, pageable?: Pagination | null, getAll = false): Observable<CarsResponse> => {
    let params = {};
    if (!!pageable && !getAll) {
      params = createRequestOption(carsCriteria, pageable);
    }

    return this.http.get<CarsResponse>(`${ this.resourceUrl }`, { params });
  };

  createCar = (req: Omit<CarModel, 'car_id'>): Observable<UpdateCarResponse> =>
    this.http.post<UpdateCarResponse>(`${ this.resourceUrl }`, req);

  updateCar = (req: CarModel): Observable<UpdateCarResponse> =>
    this.http.put<UpdateCarResponse>(`${ this.resourceUrl }/${ req.id }`, req);

  deleteCar = (id: number): Observable<DeleteResponse> =>
    this.http.delete<DeleteResponse>(`${ this.resourceUrl }/${ id }`);
}
