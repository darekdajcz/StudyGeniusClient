export interface TutorModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  description: string;
  price?: number;
}

export enum ChestType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL'
}

export enum TutorType {
  SMALL = 'SMALL',
  MID = 'BIG',
  BIG = 'SMALL',
  BUS = 'BUS'
}
