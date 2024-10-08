"use client";
import { useAuth } from "@/hook/useAuth";
import { updateImage } from "@/lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const [bio, setBio] = useState(auth?.user?.profile?.bio);
  const handleUpdateBio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const upadatedBio: { bio: string; _id: string } = {
      bio: bio as string,
      _id: auth?.user?._id as string,
    };
    const res = await updateImage(upadatedBio);
    if (res.data && auth) {
      setAuth({ ...auth, user: res?.data });
      router.push("/user/profile");
    }
  };
  return (
    <>
      <form onSubmit={handleUpdateBio}>
        <textarea
          className="textarea textarea-bordered text-black "
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          cols={30}
        ></textarea>
        <div className="flex gap-4">
          <button type="submit" className="bg-green-400 px-2 py-1">
            Update
          </button>
          <Link href={"/user/profile"}>
            <button className="bg-red-500 px-2 py-1">Close</button>
          </Link>
        </div>
      </form>
    </>
  );
}
