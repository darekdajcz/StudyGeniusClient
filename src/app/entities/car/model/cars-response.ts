import { CarModel } from './car.model';

export interface CarsResponse {
  success: boolean;
  data: CarModel[];
  count: number;
}
