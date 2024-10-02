import CommentIcon from "../../public/icons/comment.svg";
import LikeFilledIcon from "../../public/icons/like-filled.svg";
import LikeIcon from "../../public/icons/like.svg";
import ShareIcon from "../../public/icons/share.svg";

import Image from "next/image";
import { TPost } from "./PostList";

const PostAction = ({
  post,
  commentCount,
}: {
  post: TPost;
  commentCount: number;
}) => {
  //   const handleLike = async () => {
  //     try {

  //       if (response.status === 200) {
  //         setLiked(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setLiked(false);
  //     }
  //   };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        // onClick={handleLike}
      >
        <Image
          width={100}
          height={100}
          className="w-6"
          src={post.upvotes ? LikeFilledIcon : LikeIcon}
          alt="Like"
        />
        <span>Like</span>
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <Image width={100} height={100} src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <Image width={100} height={100} src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostAction;
