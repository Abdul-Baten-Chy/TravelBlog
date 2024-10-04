"use client";

import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import avater from "../public/images/avatars/avatar_1.png";

export function Avater({ isName }: { isName?: boolean }) {
  const { auth } = useAuth();
  const profilePicture = auth?.user?.profile?.profilePicture || avater;
  const name = auth?.user?.profile?.name || "User Name";

  return (
    <>
      {auth && (
        <>
          {isName && (
            <span className="text-lg font-medium lg:text-xl">{name}</span>
          )}
          <Image
            src={profilePicture}
            width={100}
            height={100}
            className="max-h-[32px] max-w-[32px] rounded-full lg:max-h-[44px] lg:max-w-[44px]"
            alt=""
          />
        </>
      )}
    </>
  );
}
