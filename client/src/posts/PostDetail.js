import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import useSession from "hooks/useSession";

import { getPost } from "./posts.actions";
import { addComment } from "comments/comments.actions";

import CommentList from "comments/CommentList";
import CommentForm from "comments/CommentForm";

import Error from "shared/Error";
import Loading from "shared/Loading";
import Like from "shared/Like";
import Image from "shared/Image";
import Author from "shared/Author";

const PostDetail = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery("post", () => getPost(id));

  const { mutate } = useMutation(
    (data) => addComment({ ...data, postId: id }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("post", (oldData) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              post: {
                ...oldData.data.post,
                comments: [...oldData.data.post.comments, data.data.comment],
              },
            },
          };
        });
      },
    }
  );

  const { session } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error="Failed to load the post" />;
  }

  if (queryData) {
    const {
      data: { post },
    } = queryData;

    const isCurrentUserPostAuthor =
      session && session?.user && post && session.user._id === post.author._id;

    return (
      <div className="p-2 px-4 md:px-32 lg:px-64 mx-auto relative">
        <Author author={post.author} createdAt={post.createdAt} />
        <Image src={post.image} height="100%" alt={post.title} />
        <div className="relative mb-4">
          <h1 className="text-2xl font-bold mt-6 mb-4 mr-10">{post.title}</h1>
          <p className="mt-4 break-all">{post.body}</p>
          {isCurrentUserPostAuthor && (
            <Link
              to={`/posts/${post._id}/edit`}
              className="block absolute top-0 right-0 m-2"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
          )}
        </div>
        <Like
          user={session?.user}
          onClick={(id) => console.log("like post")}
          record={post}
          recordName="post"
        />

        <CommentList comments={post.comments} />

        <CommentForm onSubmit={mutate} />
      </div>
    );
  }
  return null;
};

export default PostDetail;
