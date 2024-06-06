export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  author: Author;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  authorId: string;
  author: Author;
  postId: number;
  post: Post;
  createdAt: string;
}
