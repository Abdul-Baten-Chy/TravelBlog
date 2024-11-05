"use client";
import { useAuth } from "@/hook/useAuth";
import { useState } from "react";
import { Avater } from "./Image";
import PostEditor from "./PostEditor";

export function PostBox() {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  return (
    <>
      {showModal ? (
        <PostEditor onClose={setShowModal} />
      ) : (
        auth && (
          <div className="card">
            <div className="flex-center mb-3 gap-2 lg:gap-4">
              <Avater></Avater>

              <div className="flex-1">
                <textarea
                  className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                  name="post"
                  id="post"
                  placeholder="What's on your mind?"
                  onClick={() => setShowModal(true)}
                ></textarea>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
