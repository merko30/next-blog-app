import React from "react";

import { getCurrentUser } from "../auth/auth.actions";
import { useQuery } from "react-query";

const Profile = () => {
  const {
    data: queryData,
    isLoading: loading,
    error,
  } = useQuery("user", getCurrentUser);

  console.log({ loading, error });

  if (queryData) {
    const { data } = queryData;
    return <h1>{JSON.stringify(data)}</h1>;
  }
  return null;
};

export default Profile;
