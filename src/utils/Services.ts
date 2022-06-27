import axios, { AxiosError } from "axios";
import {
  LoginType,
  UpdateProfile,
  User,
  Apartment,
  UserProfile,
  CreateBooking,
  Booking,
} from "./types";

export const BACKEND_URL = "https://localhost:7060/api";
export const default_user_avatar =
  "https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png";
export const RegisterUser = async (user: User) => {
  try {
    const resp = await axios.post(`${BACKEND_URL}/User/Register`, {
      ...user,
    });
    return resp;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export const updateUserProfile = async (updates: any) => {
  await axios.put(
    `${BACKEND_URL}/user/updateUser`,
    {
      ...updates,
    },
    {
      withCredentials: true,
    }
  );
};

export const getUserProfile: () => Promise<UserProfile> = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/Actions/profile`, {
    withCredentials: true,
  });
  return data;
};
export const getUserBookings = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/Actions/MyBookings`, {
    withCredentials: true,
  });
  return data as Booking[];
};
//#region Apartment

export const updateApartment = async (apartment: Apartment) => {
  try {
    const resp = await axios.put(
      `${BACKEND_URL}/apartment/updateApartment`,
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
    `${BACKEND_URL}/Actions/profile?apartmentId=${apartmentId}`,
    {
      withCredentials: true,
    }
  );
  return data as Apartment;
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
