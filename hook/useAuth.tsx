"use client";
import { AuthContext, AuthContextType } from "@/app/context";
import { useContext, useDebugValue } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useDebugValue(context.auth, (auth) =>
    auth?.user ? "Logged In" : "Logged Out"
  );

  return context;
};
