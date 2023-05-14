import { TutorModel } from './tutor.model';

export interface TutorsResponse {
  success: boolean;
  data: TutorModel[];
  count: number;
}
