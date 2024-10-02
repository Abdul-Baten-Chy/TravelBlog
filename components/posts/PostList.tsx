import PostCard from "./PostCard";
export type TPost = {
  _id: string;
  author: string;
  title: string;
  content: string;
  images: string[];
  category: string;
  tags: string[];
  premium: boolean;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};
export type TPosts = {
  data: TPost[];
};

type Comment = {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const PostList = ({ posts }: { posts: TPosts }) => {
  return (
    !!posts &&
    posts?.data?.map((post) => <PostCard key={post._id} post={post} />)
  );
};

export default PostList;
