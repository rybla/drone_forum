"use client";

import * as types from "@/types";
import { useState } from "react";

export default function NewPost() {
  const [post, set_post] = useState<types.Post>({
    id: Math.random().toString(),
    authorId: "",
    title: "",
    body: "",
    comments: [],
  });

  const [status, set_status] = useState("");

  return (
    <div>
      <h1>Create New Post</h1>
      <div className="field">
        <div>Title:</div>
        <input
          type="text"
          onChange={(event) =>
            set_post((post) => ({ ...post, title: event.target.value }))
          }
        />
      </div>
      <div className="field">
        <div>AuthorId:</div>
        <input
          type="text"
          onChange={(event) =>
            set_post((post) => ({ ...post, authorId: event.target.value }))
          }
        />
      </div>
      <div className="field">
        <div>Body:</div>
        <textarea
          onChange={(event) =>
            set_post((post) => ({ ...post, body: event.target.value }))
          }
        />
      </div>
      <div>
        <button
          onClick={async () => {
            try {
              await fetch("/api/new_post", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ post }),
              });
              set_status("Post submitted successfully!");
            } catch (e) {
              if (!(e instanceof Error)) throw e;
              set_status(`Error submitting post: ${e.message}`);
            }
          }}
        >
          Submit
        </button>
      </div>
      <div>{status}</div>
    </div>
  );
}
