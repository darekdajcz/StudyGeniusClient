import { DaysEnum } from './days.enum';

export interface TutorModel {
  id?: number;
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  description: string;
  place: PlaceEnum[];
  phoneNumber: string;
  badges: BadgesEnum[];
  reservations: Reservation[];
  price: number | null;
  daysAvailable: DaysEnum[],
  hoursAvailable: string[]
}

export interface TutorDetailModel {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  description: string;
  place: PlaceEnum[];
  phoneNumber: string;
  badges: BadgesEnum[];
  reservations: Reservation[];
  price: number | null;
  daysAvailable: DaysEnum[],
  hoursAvailable: string
}

export enum PlaceEnum {
  TUTOR_PLACE = 'TUTOR_PLACE',
  STUDENT_PLACE = 'STUDENT_PLACE',
  ONLINE = 'ONLINE',
}

export enum BadgesEnum {
  APPROVED = 'APPROVED',
  CERTIFICATES = 'CERTIFICATES',
  STAR = 'STAR',
}

interface Reservation {
  id: number;
  date: string;
  hour: string;
  lessonTime: string;
  place: PlaceEnum;
}
