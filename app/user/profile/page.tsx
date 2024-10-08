/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/hook/useAuth";
import { updateImage } from "@/lib/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import editIcon from "../../../public/icons/edit.svg";
import ProfileImage from "../_componets/ProfileImage";

const image_hosting_key = process.env.NEXT_PUBLIC_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Profile() {
  const { auth, setAuth } = useAuth();
  //   const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const uploadedImageUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("image", file);

        // Upload image to ImageBB
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          uploadedImageUrls.push(data.data.url);
        } else {
          console.error("Image upload failed:", data.error);
        }
      }
      const updateProperty = {
        profilePicture: uploadedImageUrls[0] as string,
        _id: auth?.user?._id as string,
      };
      const upDatedUser = await updateImage(updateProperty);

      if (upDatedUser && auth) {
        setAuth({ ...auth, user: upDatedUser?.data });
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <ProfileImage onImageUpload={handleImageUpload} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {auth?.user?.profile?.name}
        </h3>
        <p className="leading-[231%] lg:text-lg">{auth?.user?.email}</p>
      </div>

      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {auth?.user?.profile?.bio}
          </p>
        </div>

        <Link
          href={"/user/profile/bioUpdate"}
          className="flex-center h-7 w-7 rounded-full"
        >
          <Image width={100} height={100} src={editIcon} alt="Edit" />
        </Link>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      <div className="flex gap-4">
        <h3> Followers: {auth?.user?.profile?.followers?.length}</h3>
        <h3> Followings: {auth?.user?.profile?.following?.length}</h3>
      </div>
    </div>
  );
}
