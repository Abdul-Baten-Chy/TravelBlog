/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PostEditor.js
"use client";
import { useAuth } from "@/hook/useAuth";
import { createPost } from "@/lib/axiosInstance";
import { SetStateAction, useState } from "react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const image_hosting_key = process.env.NEXT_PUBLIC_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const PostEditor = ({ onClose }: { onClose: (value: boolean) => void }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [premium, setPerimium] = useState<boolean>(false);
  const { auth } = useAuth();

  const handleChange = (value: SetStateAction<string>) => {
    setContent(value);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const uploadedImageUrls: any[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("image", file);

        // Upload image to ImageBB
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          uploadedImageUrls.push(data.data.url);
        } else {
          console.error("Image upload failed:", data.error);
        }
      }

      setImages((prev) => [...prev, ...uploadedImageUrls]);
    }
  };

  const handleSave = async () => {
    const post = {
      title,
      content,
      author: auth?.user._id,
      images,
      category,
      tags: tag.split(",").map((t) => t.trim()),
      premium,
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    const res = await createPost(post);

    if (res) {
      onClose(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 z-50">
      <div className="p-10 flex flex-col items-center justify-center mb-10 min-w-[400px]">
        <div>
          <div className="flex gap-4">
            <div>
              {" "}
              <label> Title: </label> <br />
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-100 mt-4 py-1 mb-4 px-2  rounded-md text-black"
              />
            </div>

            <div>
              <label> Tag: </label> <br />
              <input
                type="text"
                placeholder="Tag (comma separated)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="bg-gray-100 mt-4 py-1 mb-4 px-2  rounded-md text-black"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300  rounded-md p-2 text-black"
              >
                <option value="chinese">Chinese Food</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="data-science">Data Science</option>
                <option value="design">Design</option>
              </select>
            </div>
            <div>
              <label className="block mb-2  text-sm font-medium">
                Content Type
              </label>
              <select
                value={premium ? "true" : "false"}
                onChange={(e) => setPerimium(e.target.value === "true")}
                className="w-full border border-gray-300  rounded-md p-2 text-black"
              >
                <option value="true">Premium</option>
                <option value="false">Public</option>
              </select>
            </div>
          </div>
          <br />
          <label>Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="bg-gray-100 mt-4 mb-4 w-80 py-1 px-2 rounded-md"
          />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            className="bg-white border mb-4 border-gray-300 text-black rounded-lg shadow-md p-4"
            style={{
              minHeight: "100px",
              height: "auto",
              overflowY: "auto",
              maxWidth: "400px",
            }}
          />
          <button
            onClick={handleSave}
            className="bg-gray-400 text-black px-3 py-1 rounded-lg"
          >
            Save Post
          </button>
          <button
            className="ml-4 bg-green-500 px-3 py-1 rounded-lg"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
