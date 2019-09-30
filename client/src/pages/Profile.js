import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "../layout/Container";

import Loading from "../shared/Loading";
import Tabs from "../shared/Tabs";
import Tab from "../shared/Tabs/Tab";
import UserInfo from "../shared/UserInfo";
import EditField from "../shared/EditField";

import { updateField } from "../auth/auth.actions";
import EditAvatar from "../shared/EditAvatar";

const Profile = () => {
  const { loading, user, message, error } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

  return (
    <Container>
      {loading && <Loading />}
      {user && (
        <div className="flex flex-col md:flex-row h-full">
          <UserInfo user={user} />
          <Tabs classes="flex-1">
            <Tab title="Posts">posts</Tab>
            <Tab title="Settings">
              <EditAvatar />
              <EditField
                error={error}
                message={message}
                onSubmit={(field, values) =>
                  dispatch(updateField(field, values))
                }
                confirmation={false}
                field="name"
                validations={{
                  required: true,
                  min: { length: 8 }
                }}
              />
              <EditField
                error={error}
                message={message}
                onSubmit={(field, values) =>
                  dispatch(updateField(field, values))
                }
                confirmation={false}
                field="username"
                validations={{
                  required: true,
                  min: { length: 8 }
                }}
              />
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
                  min: { length: 8 }
                }}
              />
              <EditField
                error={error}
                message={message}
                confirmation={true}
                field="password"
                onSubmit={(field, values) =>
                  dispatch(updateField(field, values))
                }
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
