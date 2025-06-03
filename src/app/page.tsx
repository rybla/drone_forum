import * as types from "@/types";
import PostPreview from "./PostPreview";

export default async function Home() {
  const posts: types.Post[] = (
    await (await fetch(`${process.env.URL}/api/get_posts`)).json()
  ).posts;

  return (
    <div className="Home">
      {posts.map((post, i) => (
        <PostPreview key={i} id={post.id} />
      ))}
    </div>
  );
}
