"use client";

import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import avater from "../public/images/avatars/avatar_1.png";

export function Avater({
  isName,
  isLogin,
}: {
  isName?: boolean;
  isLogin: boolean;
}) {
  const { auth } = useAuth();
  const profilePicture = auth?.user?.profile?.profilePicture || avater;
  const name = auth?.user?.profile?.name || "User Name";

  return (
    <>
      {isName && auth && (
        <span className="text-lg font-medium lg:text-xl">{name}</span>
      )}
      {isLogin && !auth?.user && <Link href={"/auth/signin"}>Login</Link>}
      {auth && (
        <Image
          src={profilePicture}
          width={100}
          height={100}
          className="max-h-[32px] max-w-[32px] rounded-full lg:max-h-[44px] lg:max-w-[44px]"
          alt=""
        />
      )}
    </>
  );
}
