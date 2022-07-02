import axios, { AxiosError } from "axios";
import {
  LoginType,
  User,
  Apartment,
  UserProfile,
  CreateBooking,
  Booking,
  SearchResult,
  Status,
} from "./types";

export const BACKEND_URL = "https://localhost:7060/api";
export const default_user_avatar =
  "https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png";
export const amenities = ["Wifi", "Pool", "Gym", "Parking"];
export const AmenitiesSet = {
  Wifi: false,
  Pool: false,
  Gym: false,
  Parking: false,
};
export const RegisterUser = async (user: User) => {
  try {
    const resp = await axios.post(`${BACKEND_URL}/user`, {
      ...user,
    });
    return resp;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export const updateStatus = async (id: string, status: Status) => {
  await axios.put(
    `${BACKEND_URL}/action/updateStatus`,
    {
      id,
      status,
    },
    {
      withCredentials: true,
    }
  );
};

export const updateUserProfile = async (updates: any) => {
  await axios.put(
    `${BACKEND_URL}/user`,
    {
      ...updates,
    },
    {
      withCredentials: true,
    }
  );
};

export const getUserProfile: () => Promise<UserProfile> = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/user/`, {
    withCredentials: true,
  });
  return data;
};
export const getMyGuests = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/actions/myGuests`, {
    withCredentials: true,
  });
  return data;
};
export const bookApartment = async (booking: CreateBooking) => {
  const { data } = await axios.post(
    `${BACKEND_URL}/Actions/addBookingGuests`,
    {
      ...booking,
    },
    {
      withCredentials: true,
    }
  );
  console.log(data);
};
export const getMyBookings = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/Actions/MyBookings`, {
    withCredentials: true,
  });
  return data as Booking[];
};
export const LogOut = async () => {
  await axios.post(`${BACKEND_URL}/actions/logout`, null, {
    withCredentials: true,
  });
  // return data;
};

export const SearchApartment = async (
  city: string,
  from: string,
  to: string,
  pageNumber: number = 1,
  orderBy?: "NumOfBeds" | "DistanceFromCenter"
) => {
  try {
    // console.log(new URLSearchParams(window.location.href).get("location"));
    const order_by_param = orderBy ? `&orderBy=${orderBy}` : "";
    const from_param = from ? `&from=${from}` : "";
    const to_param = from ? `&to=${to}` : "";
    const params = `city=${city}${from_param}${to_param}&pageNumber=${pageNumber}${order_by_param}`;
    const { data }: { data: SearchResult[] } = await axios.get(
      `${BACKEND_URL}/actions/search?${params}&pageSize=15`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//#region Apartment

export const getUserApartment: () => Promise<Apartment> = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/apartment`, {
    withCredentials: true,
  });
  return data;
};
export const updateApartment = async (apartment: Apartment) => {
  try {
    const resp = await axios.put(
      `${BACKEND_URL}/apartment`,
      {
        ...apartment,
      },
      { withCredentials: true }
    );
    return resp.status;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

export const getApartmentDetails = async (apartmentId: string) => {
  const { data } = await axios.get(
    `${BACKEND_URL}/apartment/details?apartmentId=${apartmentId}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
export const createApartment = async (apartment: Apartment) => {
  try {
    const resp = await axios.post(
      `${BACKEND_URL}/apartment`,
      {
        ...apartment,
      },
      { withCredentials: true }
    );
    return resp.status;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};
//#endregion

export const UserLogin = async (login: LoginType) => {
  try {
    const resp = await axios.post(
      `${BACKEND_URL}/Actions/login`,
      {
        ...login,
      },
      { withCredentials: true }
    );
    return resp.status;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};
export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
