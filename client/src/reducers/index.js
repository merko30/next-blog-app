import { combineReducers } from "redux";

import authReducer from "../auth/auth.reducer";
import postsReducer from "../posts/posts.reducer";
import messagesReducer from "../messages/messages.reducer";

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  messages: messagesReducer
});
