export interface CarModel {
  id: number;
  mark: string;
  model: string;
  engine_capacity: string;
  color: string;
  gearbox_type?: ChestType;
  car_type?: CarType;
  price_per_day: number;
  tenant_id?: number;
}

export enum ChestType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL'
}

export enum CarType {
  SMALL = 'SMALL',
  MID = 'BIG',
  BIG = 'SMALL',
  BUS = 'BUS'
}
