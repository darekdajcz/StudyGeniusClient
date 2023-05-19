export interface TutorModel {
  id: number;
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
}

enum PlaceEnum {
  TUTOR_PLACE = 'TUTOR_PLACE',
  STUDENT_PLACE = 'STUDENT_PLACE',
  ONLINE = 'ONLINE',
}

enum BadgesEnum {
  APPROVED = 'APPROVED',
  CERTIFICATES = 'CERTIFICATES',
}

interface Reservation {
  id: number;
  date: string;
  hour: string;
  lessonTime: string;
  place: PlaceEnum;
}
