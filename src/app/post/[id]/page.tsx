import PostComments from "@/app/PostComments";
import PostControls from "@/app/PostControls";
import * as types from "@/types";

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const result: { post: types.Post } = await (
    await fetch(`${process.env.URL}/api/get_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    })
  ).json();

  return (
    <div className="Post">
      <a className="title">{result.post.title}</a>
      <pre>{JSON.stringify(result.post, null, 4)}</pre>
      <PostControls id={params.id} />
      <PostComments id={params.id} />
    </div>
  );
}
