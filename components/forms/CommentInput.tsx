"use client";
import { useAuth } from "@/hook/useAuth";
import { postComment } from "@/lib/axiosInstance";
import { SubmitHandler, useForm } from "react-hook-form";

type TInputs = {
  content: string;
};
export function CommentInput({ postId }: { postId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();
  const { auth } = useAuth();
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const comment = { ...data, author: auth?.user?._id, post: postId };
    const res = await postComment(comment);
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        {...register("content", { required: "write something" })}
        type="text"
        className="h-8 w-full rounded-full  bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
        name="content"
        id="post"
        placeholder="What's on your mind?"
      />
      {errors.content && <span>{errors.content.message}</span>}
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-xl px-3"
      >
        Post
      </button>
    </form>
  );
}
