export type Post = {
  id: string;
  authorId: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  comments: PostComment[];
};

export type PostComment = {
  id: string;
  authorId: string;
  body: string;
};
