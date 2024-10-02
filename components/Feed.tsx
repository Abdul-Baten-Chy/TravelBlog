// pages/index.js
import Post from "../components/Post";
import { TPosts } from "./posts/PostList";

const Feed = ({ posts }: { posts: TPosts }) => {
  return (
    <div>
      {posts?.data?.length === 0 ? (
        <p className="text-2xl text-center mt-20">No posts available.</p>
      ) : (
        posts.data.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Feed;
