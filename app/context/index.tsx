"use client";
import { Context, createContext } from "react";

// Define the user profile and user interfaces
interface UserProfile {
  name: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
}

interface User {
  profile: UserProfile;
  _id: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the AuthData interface
interface AuthData {
  user: User;
  token: string;
}

// Define the AuthContextType to accommodate null
interface AuthContextType {
  auth: AuthData | null; // Allow auth to be null
  setAuth: (data: AuthData | null) => void; // Function to set the auth data
}

// Create the context with proper type
const AuthContext: Context<AuthContextType | null> =
  createContext<AuthContextType | null>(null);

export { AuthContext };
export type { AuthContextType, AuthData };
