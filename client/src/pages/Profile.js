import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "../layout/Container";

import Loading from "../shared/Loading";
import Tabs from "../shared/Tabs";
import Tab from "../shared/Tabs/Tab";
import Avatar from "../shared/Avatar";
import EditField from "../shared/EditField";

import { updateField } from "../auth/auth.actions";

const Profile = () => {
  const { loading, user, message, error } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

  return (
    <Container>
      {loading && <Loading />}
      {user && (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center my-4 px-10">
            <Avatar src={user.avatar} alt={user.name} size={24} />
            <h1 className="my-1 text-lg">{user.name}</h1>
            <h1 className="my-1 text-lg">{user.username}</h1>
            <h1 className="my-1 text-lg">{user.email}</h1>
          </div>
          <Tabs classes="flex-1">
            <Tab title="Posts">posts</Tab>
            <Tab title="Settings">
              <EditField
                error={error}
                message={message}
                onSubmit={(field, values) =>
                  dispatch(updateField(field, values))
                }
                confirmation={true}
                field="email"
                validations={{
                  required: true,
                  email: true
                }}
              />
              <EditField
                confirmation={true}
                field="password"
                validations={{
                  required: true,
                  min: { length: 8 }
                }}
              />
            </Tab>
          </Tabs>
        </div>
      )}
    </Container>
  );
};

export default Profile;
