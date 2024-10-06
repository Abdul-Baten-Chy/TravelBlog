"use client";
import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoutIcon from "../../public/icons/logout.svg";
export function Logout() {
  const route = useRouter();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    console.log("je");

    localStorage.removeItem("auth");
    setAuth(null);
    route.push("/");
  };
  return (
    <button className="icon-btn" onClick={handleLogout}>
      <Image
        width={100}
        height={100}
        src={logoutIcon}
        className="max-w-[30px]  lg:max-w-[50px]"
        alt="Logout"
      />
    </button>
  );
}
