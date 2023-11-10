import { PlaceEnum } from './tutor.model';

export interface ReservationStat {
  lessonHour: string;
  lessonTime: number;
  place: PlaceEnum;
}

export interface ReservationStatistic {
  reservationStats: ReservationStat[];
}