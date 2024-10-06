// components/Post.js
import Image from "next/image";
import Link from "next/link";
import comment from "../public/icons/comment.svg";
import shareIcon from "../public/icons/share.svg";
import varifyIcon from "../public/icons/varify.png";

import { DownVotes } from "./DownVote";
import { PostBody } from "./PostBody";
import { TPost } from "./Type";
import { UpVotes } from "./UpVotes";

const Post = ({ post }: { post: TPost }) => {
  return (
    <div className="post">
      <h2 className="font-inter text-2xl md:text-3xl lg:text-4xl ">
        <Link href={`/${post._id}`}>{post.title}</Link>
      </h2>
      <div className="flex gap-4">
        <p>Author: {post?.author?.profile?.name}</p>
        <Image src={varifyIcon} width={30} height={30} alt="varify icon" />
      </div>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Tags:</strong> {post.tags.join(", ")}
      </p>
      <PostBody post={post} />
      <div className="flex gap-4 ">
        {post.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={post.title}
            width={300}
            height={200}
            className="flex-1 bg-white"
          />
        ))}
      </div>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2  items-center my-4">
          <UpVotes post={post} />
        </div>
        <div className="flex gap-2  items-center my-4">
          <DownVotes post={post} />
        </div>
        <div className="flex gap-2  items-center my-4">
          <Image
            className="w-[30px] transform scale-x-[-1] scale-y-[-1]"
            src={comment}
            width={100}
            height={100}
            alt="like icon"
          />{" "}
          <p>{post.comments.length} Comments</p>
        </div>
        <div className="flex gap-2  items-center my-4">
          <Image
            className="w-[30px] transform scale-x-[-1] scale-y-[-1]"
            src={shareIcon}
            width={100}
            height={100}
            alt="like icon"
          />{" "}
          <p> Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
