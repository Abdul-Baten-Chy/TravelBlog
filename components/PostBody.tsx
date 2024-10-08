"use client";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { TPost } from "./Type";

export function PostBody({ post }: { post: TPost }) {
  const { auth } = useAuth();
  const route = useRouter();
  const handleVarified = () => {
    if (auth?.user?.verified) {
      route.push(`user/${post._id}`);
    } else {
      route.push("/user/paysubscription");
    }
  };
  return (
    <div className="mb-8 mt-10">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <button onClick={handleVarified}>
        <span className="text-blue-400">Read Full Blog</span>
      </button>
    </div>
  );
}
