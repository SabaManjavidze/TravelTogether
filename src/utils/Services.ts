import axios, { AxiosError } from "axios";
import { LoginType, UpdateProfile, User, UserProfile } from "./types";

export const BACKEND_URL = "https://localhost:7060/api";
export const default_user_avatar =
  "https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png";
export const RegisterUser = async (user: User) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/User/Register`, {
      ...user,
    });
    console.log(data);
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export const UpdateUserProfile = async (updates: any) => {
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
export const UserLogin = async (login: LoginType) => {
  try {
    // const resp = await fetch(`${BACKEND_URL}/Actions/login`, {
    //   method: "POST",
    //   body: JSON.stringify({ ...login }),
    //   credentials: "include",
    // });
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
