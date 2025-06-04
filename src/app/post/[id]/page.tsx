"use client";

import * as types from "@/types";
import { useEffect, useState } from "react";

export default function Post(props: { params: Promise<{ id: string }> }) {
  const [post, set_post] = useState<types.Post | undefined>(undefined);

  useEffect(() => {
    async function loadPost() {
      const params = await props.params;

      const res = await fetch("/api/get_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
        }),
      });

      set_post((await res.json()).post);
    }

    loadPost();
  }, [props.params]);

  if (post !== undefined) {
    return (
      <div className="PostPage">
        <div className="Post">
          <a className="title">{post.title}</a>
          <div className="authorId">{post.authorId}</div>
          <div className="body">{post.body}</div>
          <div className="metadata">
            <div className="likes">{post.likes}</div>
            <div className="dislikes">{post.dislikes}</div>
          </div>
          <div className="comments">
            {post.comments.map((comment, i) => (
              <div key={i} className="comment">
                <div className="authorId">{comment.authorId}</div>
                <div className="body">{comment.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="Post">loading ...</div>;
  }
}
