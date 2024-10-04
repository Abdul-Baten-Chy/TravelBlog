/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axios from "axios";
import { revalidateTag } from "next/cache";
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
export const postComment = async (userData: FieldValues) => {
  // try {
  //   const { data } = await axiosInstance.post("api/comments", userData);
  //   console.log(data, "data");

  //   return data;
  // } catch (error: any) {
  //   console.log(error);
  // }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type
          // The 'Cookie' header will automatically include cookies in the request.
        },
        body: JSON.stringify(userData), // Send the content as JSON
        credentials: "include", // Ensure cookies are sent with the request
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    revalidateTag("post");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};
