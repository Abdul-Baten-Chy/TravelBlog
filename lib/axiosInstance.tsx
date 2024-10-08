/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TcreatPost } from "@/components/Type";
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
      config.headers.Authorization = accessToken;
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

    if (data?.success) {
      cookies().set("token", data?.data?.token);
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

    if (data?.success) {
      cookies().set("token", data?.data?.token);
    }

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
export const postComment = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
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

export const createPost = async (post: TcreatPost) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    if (data) {
      revalidateTag("posts");
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};
export const updateImage = async (post: {
  images?: string;
  _id: string;
  bio?: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
        credentials: "include",
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    if (data) {
      revalidateTag("user");
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

export const logout = () => {
  cookies().delete("token");
};
