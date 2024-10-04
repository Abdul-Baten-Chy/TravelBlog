"use client";
import { useAuth } from "@/hook/useAuth";
import { useEffect } from "react";

const GetUser = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      setAuth(auth);
    }
  }, [setAuth]);
  return null;
};

export default GetUser;
