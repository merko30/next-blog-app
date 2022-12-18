import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Like = ({ onClick, record, user, recordName }) => {
  const liked = user && record.likes.includes(user._id);
  return (
    <div className={`py-2 flex items-center like-position`}>
      <span
        className={`cursor-pointer border-2 border-green-300 flex items-center justify-center p-3 mr-2 rounded-full`}
      >
        <FontAwesomeIcon
          title={liked ? "Dislike" : "Like"}
          icon={faThumbsUp}
          onClick={() => onClick(record._id)}
          color="#68d391"
        />
      </span>
      <span className="ml-1 text-lg text-green-500">{record.likes.length}</span>
    </div>
  );
};

export default Like;
