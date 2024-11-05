"use client";

import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { TPost } from "./Type";

export function PostBody({ post }: { post: TPost }) {
  const { auth } = useAuth();
  const route = useRouter();

  const handleVerified = () => {
    if (!auth?.user) {
      route.push("/auth/signin?redirect=/user/paysubscription");
      return;
    }

    if (auth.user.verified) {
      route.push(`user/${post._id}`);
    } else {
      route.push("/user/paysubscription");
    }
  };

  const contentToDisplay =
    post?.content?.length > 100
      ? post?.content.slice(0, post?.content?.length - 3)
      : post?.content;

  return (
    <div className="mb-8 mt-10">
      <div
        dangerouslySetInnerHTML={{
          __html: contentToDisplay,
        }}
      />

      <button onClick={handleVerified}>
        <span className="text-blue-400">Read Full Blog</span>
      </button>
    </div>
  );
}
