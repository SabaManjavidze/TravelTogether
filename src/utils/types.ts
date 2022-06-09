export type User = {
  fisrt_name: string;
  last_name: string;
  email: string;
  photo: string;
};
export type UserAparatment = {
  city: string;
  address: string;
  number_of_beds: number;
  photo: string;
  distance_from_center: number;
};
export type Guest = {
  firstName: string;
  lastName: string;
  from: Date;
  to: Date;
};
export type Booking = {
  city: string;
  from: Date;
  to: Date;
};
