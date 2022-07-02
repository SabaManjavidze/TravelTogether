export type User = {
  firstName: string;
  lastName: string;
  image: string;
  description: string;
};
// export interface UserProfile extends User {
//   // firstName?: string;
//   // lastName?: string;
//   // image?: string;
//   // description?: string;
//   email?: string;
// }
export type GeopifyResponse = {
  properties: GeopifyProperties;
};
export type GeopifyProperties = {
  old_name?: string;
  city?: string;
  suburb?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  lon?: number;
  lat?: number;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  category?: string;
  result_type: "suburb" | "city" | "postcode";
  place_id?: string;
};
export interface UserProfile extends User {
  // apartment?: Apartment | null;
  email?: string;
  id?: string;
}
export type LoginType = {
  email: string;
  password: string;
};
export interface Apartment extends Amenities {
  id?: string;
  address?: string;
  image?: string;
  distanceFromCenter?: number;
  numOfBeds?: number;
  description?: string;
  city?: string;
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
  pool?: boolean;
  gym?: boolean;
  wifi?: boolean;
  parking?: boolean;
};
export interface Guest extends DateRange {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  description: string;
}
type DateRange = {
  from: Date;
  to: Date;
};
export interface CreateBooking extends DateRange {
  hostId: string;
}
export type Status = "Accepted" | "Rejected" | "Pending";
// export type StatusEnum = 2 | 0 | 1;

export interface Booking extends DateRange {
  id: string;
  apartment: Apartment;
  status: Status;
  Image: string;
}
