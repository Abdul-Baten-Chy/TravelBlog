import Feed from "@/components/Feed";
import { TPost } from "@/components/Type";
import { getCurrentUser } from "@/components/utils/GetCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();
  console.log(user);

  let posts;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { tags: ["posts"] },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    posts = await res.json();
    console.log(posts, "tantan");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  const myPost = posts?.data?.filter(
    (post: TPost) => post?.author?.email == user?.email
  );
  return (
    <div className="mr-10">
      <Feed posts={{ data: myPost }} />
    </div>
  );
}
