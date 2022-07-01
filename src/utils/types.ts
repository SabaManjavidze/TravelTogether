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
  // apartment?: Apartment | null;
  email?: string;
}
export type LoginType = {
  email: string;
  password: string;
};
export interface Apartment extends Amenities {
  id: string;
  address: string;
  image: string;
  distanceFromCenter: number;
  numOfBeds: number;
  description: string;
  city: string;
}
export type SearchResult = {
  id: string;
  address: string;
  image: string;
  distanceFromCenter: number;
  numOfBeds: number;
  description: string;
  city: string;
  avaliable: boolean | null;
  ownerId: string;
};
export type Amenities = {
  pool: boolean;
  gym: boolean;
  wifi: boolean;
  parking: boolean;
};
export type Guest = {
  firstName: string;
  lastName: string;
  from: Date;
  to: Date;
};
type DateRange = {
  from: Date;
  to: Date;
};
export interface CreateBooking {
  hostId: string;
  from: Date;
  to: Date;
}
export type Status = "Accept" | "Decline" | "Pending";
export type StatusEnum = "-1" | 0 | 1;

export interface Booking extends DateRange {
  id: string;
  apartment: Apartment;
  status: StatusEnum;
  Image: string;
}
