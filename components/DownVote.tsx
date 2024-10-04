"use client";
import Image from "next/image";

import axios from "axios";
import { useState } from "react";
import like from "../public/icons/like.svg";
import { TPost } from "./Type";

export function DownVotes({ post }: { post: TPost }) {
  const [downVotes, setDownVotes] = useState(post?.downvotes);

  const handleDownVotes = async () => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/downVotes`,
      { postId: post._id }
    );
    if (res.status == 200) {
      setDownVotes(res?.data?.data?.downvotes);
    }
  };
  return (
    <>
      <button onClick={handleDownVotes}>
        <Image
          className="w-[30px]"
          src={like}
          width={100}
          height={100}
          alt="like icon"
        />{" "}
      </button>
      <p>{downVotes} Down Votes</p>
    </>
  );
}
