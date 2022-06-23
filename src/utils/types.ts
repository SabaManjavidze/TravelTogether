export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export interface UserProfile extends User {
  image: string;
}
export type UserApartment = {
  id: string;
  address: string;
  image: string;
  distance_from_center: number;
  num_of_beds: number;
  description: string;
  city: string;
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
