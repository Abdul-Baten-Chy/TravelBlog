"use client";
import { useState } from "react";

import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import ThreeDotsIcon from "../../public/icons/3dots.svg";
import DeleteIcon from "../../public/icons/delete.svg";
import EditIcon from "../../public/icons/edit.svg";
import { TPost } from "./PostList";

const PostHeader = ({ post }: { post: TPost }) => {
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const isMe = post?.author?._id == auth?.user?._id;

  function toggleAction() {
    setShowAction(!showAction);
  }

  //   const handleDeletePost = async (event: any) => {
  //     try {
  //       //   const response = await api.delete(
  //       //     `${process.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
  //       //   );

  //       if (response.status === 200) {
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Image
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={post.author.profilePicture}
          alt="avatar"
          width={100}
          height={100}
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          {/* <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt
            )} ago`}</span>
            <span className="text-sm text-gray-400 lg:text-base"></span>
          </div> */}
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <Image
              src={ThreeDotsIcon}
              width={100}
              height={100}
              alt="3dots of Action"
            />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <Image width={100} height={100} src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              //   onClick={handleDeletePost}
            >
              <Image width={100} height={100} src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
