import { Link } from "react-router-dom";

import Image from "../shared/Image";

const ProfilePostItem = ({ post }) => {
  return (
    <div className="p-4 rounded-lg shadow flex m-2">
      <div style={{ width: "120px" }}>
        <Image src={post.image} alt={post.title} height="120px" />
      </div>
      <div className="ml-2 flex-1">
        <h1 className="text-lg text-gray-800">{post.title}</h1>
        <p
          style={{
            height: "3.6em",
            lineHeight: "1.2em",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {post.body}
        </p>
        <Link to={`/posts/${post._id}`}>Read more</Link>
      </div>
    </div>
  );
};

export default ProfilePostItem;
