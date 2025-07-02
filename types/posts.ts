export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  shortDescription?: string;
  description?: string;
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
