import { ErrorBoundary } from "react-error-boundary";

import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  if (!posts || !posts.length) {
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/img/empty.svg`}
          alt="no_posts"
          style={{
            width: "300px",
            height: "300px",
          }}
        />
        <h2 className="text-xl">There are no posts, stay tuned.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {posts.length > 0 &&
        posts.map((post) => (
          <ErrorBoundary
            key={post._id}
            fallbackRender={() => <h1>Something went wrong</h1>}
          >
            <PostItem post={post} />
          </ErrorBoundary>
        ))}
    </div>
  );
};

export default PostList;
