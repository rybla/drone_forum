"use client";

import * as types from "@/types";
import { useEffect, useState } from "react";

export default function PostPreview(props: { id: string }) {
  const [post, set_post] = useState<types.Post | undefined>(undefined);

  useEffect(() => {
    async function loadPost() {
      const res = await fetch("/api/get_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
        }),
      });

      set_post((await res.json()).post);
    }

    loadPost();
  }, [props.id]);

  if (post !== undefined) {
    return (
      <div className="PostPreview">
        <a className="title" href={`/post/${post.id}`}>
          {post.title}
        </a>
        <div className="authorId">{post.authorId}</div>
        <div className="body">{post.body}</div>
        <div className="metadata">
          <div className="likes">{post.likes}</div>
          <div className="dislikes">{post.dislikes}</div>
        </div>
      </div>
    );
  } else {
    return <div className="PostPreview">loading...</div>;
  }
}
