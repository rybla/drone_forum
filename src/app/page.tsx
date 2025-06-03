import * as types from "@/types";
import Post from "./Post";

export default async function Home() {
  const posts: types.Post[] = (
    await (await fetch(`${process.env.URL}/api/get_posts`)).json()
  ).posts;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <a href="/new_post">new_post</a>
        </div>
        <div className="posts">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
