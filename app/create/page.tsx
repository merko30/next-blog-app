import PostForm from "@/components/posts/PostForm";

const CreatePost = () => (
  <div className="w-full flex flex-col items-center">
    <h1 className="text-2xl md:text-4xl mb-8">What's on your mind?</h1>
    <PostForm />
  </div>
);

export default CreatePost;
