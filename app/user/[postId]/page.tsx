import Comments from "@/components/Comments";
import Image from "next/image";

export default async function DetailsPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  let post;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
      {
        next: { tags: ["post"] },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    post = await res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  return (
    <>
      {post && (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {post?.data?.title}
            </h1>
            <p className="text-gray-600 mt-2">
              By {post?.data?.author?.profile?.name}
            </p>
            <p className="text-gray-500 text-sm">
              Posted at: {new Date(post?.data?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">
              Category: {post?.data?.category}
            </p>
            <p className="text-gray-500 text-sm">
              Tags:
              {post?.data?.tags.map((tag: string, index: number) => (
                <span key={index} className="ml-1">
                  {tag},
                </span>
              ))}
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {post?.data?.images.map((image: string, index: number) => (
              <Image
                src={image}
                key={index}
                width={100}
                height={100}
                alt={post?.data?.title}
                className="w-full rounded-lg"
              />
            ))}
          </div>
          <div className="prose prose-lg text-gray-700">
            <p>{post?.data?.content}</p>
          </div>
          <Comments post={post?.data} />
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Back to Blogs
            </button>
          </div>
        </div>
      )}
    </>
  );
}
