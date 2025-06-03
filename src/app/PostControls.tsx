"use client";

export default function PostControls(props: { id: string }) {
  return (
    <div className="PostControls">
      <button
        onClick={() =>
          fetch("/api/interact_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: props.id, action: "like" }),
          })
        }
      >
        like
      </button>
      <button
        onClick={() =>
          fetch("/api/interact_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: props.id, action: "dislike" }),
          })
        }
      >
        dislike
      </button>
    </div>
  );
}
