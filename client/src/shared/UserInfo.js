import React from "react";
import Avatar from "./Avatar";

const UserInfo = ({ user }) => {
  return (
    <div className="flex md:flex-col flex-row items-center my-8 md:my-4 px-10">
      <Avatar src={user.avatar} alt={user.name} size={24} />
      <div className="ml-10 md:ml-0">
        <h1 className="my-1 text-2xl uppercase font-bold">{user.name}</h1>
      </div>
    </div>
  );
};

export default UserInfo;
