"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const accessToken = cookies().get("token")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    console.log(decodedToken.role, "role");

    return {
      email: decodedToken?.userEmail,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};
