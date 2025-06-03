"use client";

import * as types from "@/types";
import PostControls from "./PostControls";

export default function PostPreview(props: { post: types.Post }) {
  return (
    <div className="PostPreview">
      <a className="title" href={`/post/${props.post.id}`}>
        {props.post.title}
      </a>
      <pre>{JSON.stringify(props.post, null, 4)}</pre>
      <PostControls id={props.post.id} />
    </div>
  );
}
