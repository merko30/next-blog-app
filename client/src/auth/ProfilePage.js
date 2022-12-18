import { useQuery } from "react-query";

import { getCurrentUser } from "./auth.actions";

import Loading from "shared/Loading";
import Error from "shared/Error";

const Profile = () => {
  const {
    data: queryData,
    isLoading: loading,
    error,
  } = useQuery("user", getCurrentUser);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error error={error.response?.data.message || "Something went wrong"} />
    );
  }

  if (queryData) {
    const {
      data: {
        user: { username, email },
      },
    } = queryData;
    return (
      <h1 className="text-3xl">
        {username} - {email}
      </h1>
    );
  }
  return null;
};

export default Profile;
