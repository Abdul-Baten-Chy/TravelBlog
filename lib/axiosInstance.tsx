/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axios from "axios";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor for attaching token
axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("token")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("api/auth/signin", userData);

    if (data.success) {
      cookies().set("token", data?.data?.token);
      console.log(data?.data?.token, data?.data?.user);
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("api/auth/signup", userData);
    console.log(data, "data");

    if (data.success) {
      cookies().set("token", data?.data?.token);
    }

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
