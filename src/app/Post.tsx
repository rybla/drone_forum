import * as types from "@/types";

export default async function Post(props: { post: types.Post }) {
  return (
    <div className="Post" style={{ boxShadow: "0 0 0 0.1em black" }}>
      <div>Post</div>
      <pre>{JSON.stringify(props.post, null, 4)}</pre>
    </div>
  );
}
