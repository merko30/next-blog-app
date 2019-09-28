import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../layout/Container";
import Loading from "../shared/Loading";
import Tabs from "../shared/tabs";
import Tab from "../shared/tabs/Tab";

const Profile = () => {
  const { loading, user } = useSelector(({ auth }) => auth);

  useEffect(() => {}, [user]);

  return (
    <Container>
      {loading && <Loading />}
      {user && <div>{user.name}</div>}
      <Tabs>
        <Tab title="Info">some content here</Tab>
        <Tab title="Settings">second tab</Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;
