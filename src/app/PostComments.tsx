"use client";

import { useState } from "react";

export default function PostComments(props: { id: string }) {
  const [comment, set_comment] = useState("");

  return (
    <div className="PostComments">
      <textarea onChange={(event) => set_comment(event.target.value)} />
      <button
        onClick={() =>
          fetch("/api/interact_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: props.id,
              action: "comment",
              comment,
            }),
          })
        }
      >
        Submit
      </button>
    </div>
  );
}
