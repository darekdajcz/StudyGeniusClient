import { CarModel } from './car.model';

export interface UpdateCarResponse {
  success: boolean;
  data: CarModel;
}
