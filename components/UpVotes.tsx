"use client";
import Image from "next/image";

import axios from "axios";
import { useState } from "react";
import like from "../public/icons/like.svg";
import { TPost } from "./Type";

export function UpVotes({ post }: { post: TPost }) {
  const [upVotes, setUpvote] = useState(post?.upvotes);

  const handleUpVote = async () => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/upVotes`,
      { postId: post._id }
    );
    if (res.status == 200) {
      setUpvote(res?.data?.data?.upvotes);
    }
  };
  return (
    <>
      <button onClick={handleUpVote}>
        <Image
          className="w-[30px]"
          src={like}
          width={100}
          height={100}
          alt="like icon"
        />{" "}
      </button>
      <p>{upVotes} Upvotes</p>
    </>
  );
}
