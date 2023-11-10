import { DaysEnum } from './days.enum';
import { SubjectEnum } from './subject.enum';

export interface TutorModel {
  id?: number;
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  subject: SubjectEnum;
  description: string;
  place: PlaceEnum[];
  phoneNumber: string;
  badges: BadgesEnum[];
  reservations: Reservation[];
  price: number | null;
  daysAvailable: DaysEnum[];
  hoursAvailable: string;
  postalCode: string;
  city: string;
  street: string;
  houseNumber: string;
}

export interface TutorDetailModel {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  subject: SubjectEnum;
  description: string;
  place: PlaceEnum[];
  phoneNumber: string;
  badges: BadgesEnum[];
  reservations: Reservation[];
  price: number | null;
  daysAvailable: DaysEnum[],
  hoursAvailable: string
  postalCode: string
  city: string
  street: string
  houseNumber: string
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
