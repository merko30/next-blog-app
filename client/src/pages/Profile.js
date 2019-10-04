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
import Message from "../shared/Message";
import Error from "../shared/Error";

const Profile = () => {
  const {
    auth: {
      user,
      loading,
      error,
      posts: { numberOfPages, posts }
    },
    messages: { message }
  } = useSelector(({ auth, messages }) => ({ auth, messages }));
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
        <div className="flex flex-col lg:flex-row my-12">
          <UserInfo user={user} />
          <Tabs classes="shadow pb-2 flex-auto lg:ml-2">
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
              {error && <Error error={error} classes="mx-2" />}
              {message && (
                <Message message={message} classes="mx-2" color="green" />
              )}
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
