import { revalidateTag } from "next/cache";

export const fetchUpvotes = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/upVotes`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: id }),
        credentials: "include",
      }
    );

    if (res) {
      const data = await res.json();
      console.log("Upvote successful:", data);
      revalidateTag("posts");
      return data;
    }
  } catch (error) {
    console.error("Error handling upvote:", error);
  }
};
