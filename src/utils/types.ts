export type User = {
  firstName: string;
  lastName: string;
  image: string;
  description: string;
};
export interface UpdateProfile {
  firstName?: string | undefined;
  lastName?: string | undefined;
  image?: string | undefined;
  description?: string | undefined;
  email?: string | undefined;
}
export interface UserProfile extends User {
  apartments?: UserApartment[] | null;
  email?: string;
}
export type LoginType = {
  email: string;
  password: string;
};
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
