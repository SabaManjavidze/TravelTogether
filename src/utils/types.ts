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
  apartments?: Apartment[] | null;
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
  GuestId: string;
  HostId: string;
  From: Date;
  To: Date;
}
export type Status = "Accept" | "Decline" | "Pending";

export interface Booking extends DateRange {
  id: string;
  apartment: Apartment;
  status: Status;
  Image: string;
}
