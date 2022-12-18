import ProfilePostItem from "./ProfilePostItem";
import Pagination from "../shared/Pagination";

const UsersPosts = ({ posts, numberOfPages, onClick }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <ProfilePostItem post={post} key={post._id} />)
      ) : (
        <h1 className="text-gray-400 text-lg py-10">You have no posts!</h1>
      )}
      <Pagination numberOfPages={numberOfPages} onClick={onClick} />
    </div>
  );
};
export default UsersPosts;
