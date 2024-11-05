"use client";

import { deletePost } from "@/components/utils/deletePost";
import { revalidateTag } from "next/cache";
import Swal from "sweetalert2";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const success = await deletePost(id);

      if (success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Post deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        revalidateTag("posts");
      } else {
        throw new Error("Failed to delete post."); // Handle failure
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <button className="bg-red-600 px-3 py-1" onClick={handleDelete}>
      Delete
    </button>
  );
}
