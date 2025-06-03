import * as types from "@/types";
import PostPreview from "./PostPreview";

export default async function Home() {
  const posts: types.Post[] = (
    await (await fetch(`${process.env.URL}/api/get_posts`)).json()
  ).posts;

  return (
    <div className="Home">
      <main>
        <h1>Home</h1>
        <div className="menu">
          <a href="/new_post">new_post</a>
        </div>
        <div className="feed">
          {posts.map((post, i) => (
            <PostPreview key={i} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
