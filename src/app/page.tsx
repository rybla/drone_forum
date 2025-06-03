import { Post } from "@/types";

export default async function Home() {
  const posts_response = await fetch(`${process.env.URL}/api/get_posts`);
  const posts: Post[] = await posts_response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <a href="/login">login</a>
        </div>
        <div>
          <a href="/new_account">new_account</a>
        </div>
        <div>
          <a href="/new_post">new_post</a>
        </div>
        <div>
          <pre>{JSON.stringify(posts, null, 4)}</pre>
        </div>
      </main>
    </div>
  );
}
