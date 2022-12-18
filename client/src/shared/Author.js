import Avatar from "./Avatar";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";

const Author = ({ author, createdAt }) => {
  return (
    <div className="flex items-center mb-2 pb-3">
      <Avatar src={author.avatar} alt="author avatar" />
      <div className="ml-2">
        <h3 className="font-bold uppercase">
          {author.name || author.username}
        </h3>
        <p className="text-sm text-gray-600">
          {distanceInWordsToNow(new Date(createdAt))} ago
        </p>
      </div>
    </div>
  );
};

export default Author;
