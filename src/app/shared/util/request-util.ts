import { HttpParams } from '@angular/common/http';
import { CarCriteria } from '../../entities/car/car.service';
import { values } from 'lodash';

export interface Page<T> {
  content: T;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: any;
  sort: any;
}

export interface Pagination {
  limit: number;
  offset: number;
  sort: string;
  dir: string;
}

export const createRequestOption = (carsCriteria: CarCriteria, pageable?: Pagination): HttpParams => {
  let options = new HttpParams();
  const carsCriteriaArr: string[] = [];
  if(pageable) {
    const pageableValues = values(pageable);
    Object.keys(pageable).forEach((key, index) => {
      options = options.set(key, pageableValues[index]);
    });
  }

  const carsCriteriaValues = values(carsCriteria);
  Object.keys(carsCriteria).forEach((key, index) => {
    if (!!carsCriteriaValues[index]) {
      carsCriteriaArr.push(`{"property":"${ key }","value":"${ carsCriteriaValues[index] }"}`);
    }
  });

  options = options.set('filter', `[${carsCriteriaArr.toString()}]`);

  return options;
};
