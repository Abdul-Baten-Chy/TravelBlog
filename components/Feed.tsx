// pages/index.js
import Post from "../components/Post";
import { ApiResponse, TPost } from "./Type";

const Feed = ({ posts }: { posts: ApiResponse }) => {
  return (
    <div>
      {posts?.data?.length === 0 ? (
        <p className="text-2xl text-center mt-20">No posts available.</p>
      ) : (
        posts?.data?.map((post: TPost) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Feed;
