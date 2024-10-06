import Feed from "@/components/Feed";
import { PostBox } from "@/components/PostBox";

export default async function userPage() {
  let posts;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { tags: ["posts"] },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    posts = await res.json();
    console.log(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <PostBox></PostBox>
      <Feed posts={posts}></Feed>
    </div>
  );
}
