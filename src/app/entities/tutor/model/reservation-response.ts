import { PlaceEnum } from './tutor.model';

export interface ReservationListResponse {
  success: boolean;
  reservations: Reservation[];
}

export interface Reservation {
  date: string;
  lessonHour: string;
  lessonTime: number;
  place: PlaceEnum;
  tutorId: number;
  studentId: number;
}