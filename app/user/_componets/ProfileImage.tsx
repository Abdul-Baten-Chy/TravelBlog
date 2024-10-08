"use client";

import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import editeIcon from "../../../public/icons/edit.svg";
import avater from "../../../public/images/avatars/avatar_1.png";
interface ProfileImageProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ProfileImage({ onImageUpload }: ProfileImageProps) {
  const { auth } = useAuth();
  const profilePicture = auth?.user?.profile?.profilePicture || avater;

  return (
    <>
      {auth && (
        <Image
          src={profilePicture}
          width={100}
          height={100}
          className="h-[100px] -[100px] rounded-full lg:h-[150px] lg:w-[150px]"
          alt=""
        />
      )}
      <input
        id="file"
        type="file"
        hidden
        onChange={onImageUpload}
        accept="image/*"
      />
      <button
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        onClick={() => document?.getElementById("file")?.click()}
        type="button"
      >
        <Image width={100} height={100} src={editeIcon} alt="Edit" />
      </button>
    </>
  );
}
