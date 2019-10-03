import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "../layout/Container";

import Loading from "../shared/Loading";
import Tabs from "../shared/Tabs/index";
import Tab from "../shared/Tabs/Tab";
import UserInfo from "../shared/UserInfo";
import EditField from "../shared/EditField";

import { updateField, getUsersPosts } from "../auth/auth.actions";
import EditAvatar from "../shared/EditAvatar";
import UsersPosts from "../posts/components/UsersPosts";

const Profile = () => {
  const {
    loading,
    user,
    message,
    error,
    posts: { numberOfPages, posts }
  } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [calledOnce, setCalledOnce] = useState(false);

  useEffect(() => {
    if (!calledOnce) {
      dispatch(getUsersPosts());
    }
    setCalledOnce(true);
  }, [user, posts]);

  return (
    <Container classes="h-full">
      {loading && <Loading />}
      {user && (
        <div className="h-full">
          <UserInfo user={user} />
          <Tabs classes="shadow pb-2">
            <Tab title="Posts">
              <div className="flex items-center justify-center">
                {posts && (
                  <UsersPosts
                    posts={posts}
                    numberOfPages={numberOfPages}
                    onClick={page => dispatch(getUsersPosts(page))}
                  />
                )}
              </div>
            </Tab>
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
                  required: true
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
