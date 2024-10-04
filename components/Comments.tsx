import Image from "next/image";

import { Avater } from "./Image";
import { TPost } from "./Type";
import { CommentInput } from "./forms/CommentInput";

export default function Comments({ post }: { post: TPost }) {
  return (
    <>
      <div>
        <div className="flex-center mb-3 mt-14 gap-2 lg:gap-4">
          <Avater />
          <div className="flex-1">
            <CommentInput postId={post._id} />
          </div>
        </div>

        <div className="mt-4">
          <button className="text-gray-900 max-md:text-sm">
            All Comment ▾
          </button>
        </div>

        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {post &&
            post.comments.map((cm, index) => (
              <div key={index} className="flex items-center gap-3 pt-4">
                <Image
                  className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                  src={cm.author.profile.profilePicture}
                  width={100}
                  height={100}
                  alt="avatar"
                />
                <div>
                  <div className="flex gap-1 text-xs lg:text-sm text-black">
                    <span>{cm.author.profile.name}: </span>
                    <span>{cm.content}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
