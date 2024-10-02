import Image from "next/image";

const PostBody = ({
  poster,
  content,
}: {
  poster: string[];
  content: string;
}) => {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p className="mb-4">{content ?? "No Content Available"}</p>

      <div className="flex items-center justify-center overflow-hidden">
        {poster &&
          poster.map((image, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              className="w-1/2"
              src={image}
              alt="poster"
            />
          ))}
      </div>
    </div>
  );
};

export default PostBody;
