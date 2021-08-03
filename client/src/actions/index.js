import { server } from "../api";
import history from "../history";

const auth = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

//////////////////////////////////////
//////////////////////////////////////

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const isLoading = (trueOrFalse) => {
  return {
    type: "LOADING",
    payload: trueOrFalse,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const signInWithToken = (token) => async (dispatch) => {
  try {
    const res = await server.get("/profile/user", auth(token));

    const { user } = res.data;

    dispatch(setUser(user));
    dispatch(getFriendRequests(token));
    dispatch(setToken(token));
    dispatch(isLoading(false));

    if (window.location.pathname === "/")
      history.push(`/profile/${user.username}`);
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const createUser = (username, email, password) => async (dispatch) => {
  try {
    const res = await server.post("/create/user", {
      username,
      email,
      password,
    });

    await dispatch(setUser(res.data.user));
    await dispatch(setToken(res.data.token));
    history.push("/feed");
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const openModal = (name) => {
  return {
    type: "OPEN_MODAL",
    payload: name,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL",
    payload: null,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const toggleDropdown = () => {
  return {
    type: "TOGGLE_DROPDOWN",
    payload: null,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await server.post("/login", { email, password });

    const { user, token } = res.data;

    dispatch(setUser(user));
    dispatch(getFriendRequests(token));
    dispatch(setToken(token));
    history.push(`/profile/${user.username}`);
  } catch (e) {
    dispatch({ type: "LOGIN_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const logout = () => async (dispatch, getState) => {
  const { token } = getState();
  try {
    await server.post("/logout", {}, auth(token));

    dispatch(closeModal());
    localStorage.clear();
    history.push("/");

    await dispatch(setToken(null));
    await dispatch(setUser(null));
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////////////
//////////////////////////////////////

// export const getWorkoutHistory = (token) => async (dispatch) => {
//   try {
//     const res = await server.get("/workout/history", auth(token));

//     dispatch({ type: "WORKOUT_HISTORY", payload: res.data });
//   } catch (e) {
//     console.log(e);
//   }
// };

////////////////////////////////////
//////////////////////////////////////

export const createWorkout = (values) => async (dispatch, getState) => {
  const { token, user } = getState();

  try {
    const res = await server.post("/workout", values, auth(token));

    if (values.file) {
      console.log(values.file);
      const data = new FormData();
      data.append("image", values.file);

      await server.post(`/workout/image/${res.data._id}`, data, auth(token));
    }

    dispatch(getViewUser(user.username));
  } catch (e) {
    dispatch({ type: "NEW_WORKOUT_ERROR", payload: null });
  }
};

////////////////////////////////////
//////////////////////////////////////

// export const getSummary = (token) => async (dispatch) => {
//   try {
//     const res = await server.get("/summary", auth(token));

//     dispatch({ type: "GET_SUMMARY", payload: res.data });
//   } catch (e) {
//     dispatch({ type: "GET_SUMMARY_ERROR", payload: e });
//   }
// };

////////////////////////////////////
//////////////////////////////////////

export const getFeed = (token) => async (dispatch) => {
  try {
    const res = await server.get("/feed", auth(token));

    dispatch({ type: "FEED", payload: res.data });
  } catch (e) {
    dispatch({ type: "FEED_ERROR", payload: e });
  }
};

////////////////////////////////////
//////////////////////////////////////

export const newPost = (text, token) => async (dispatch) => {
  try {
    const res = await server.post("/post", { text }, auth(token));

    dispatch({ type: "NEW_POST", payload: res.data });
  } catch (e) {
    dispatch({ type: "NEW_POST_ERROR", payload: e });
  }
};

////////////////////////////////////
//////////////////////////////////////

export const getViewUser = (username) => async (dispatch, getState) => {
  dispatch({ type: "VIEW_USER", payload: "loading" });
  const { token } = getState();

  try {
    const res = await server.get("/viewuser", {
      headers: { Authorization: `Bearer ${token}`, username },
    });

    dispatch({ type: "VIEW_USER", payload: res.data });
  } catch (e) {
    dispatch({ type: "VIEW_USER_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

//username should belong to the receiver
export const sendFriendReq = (username) => async (dispatch, getState) => {
  const { token } = getState();

  try {
    const res = await server.post("/request", { username }, auth(token));

    dispatch({ type: "SEND_REQ", payload: res.data });
  } catch (e) {
    dispatch({ type: "SEND_REQ_ERROR", payload: "error" });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const getFriendRequests = (token) => async (dispatch) => {
  try {
    const res = await server.get("/request", auth(token));

    dispatch({ type: "GET_REQ", payload: res.data });
  } catch (e) {
    dispatch({ type: "GET_REQ_ERROR", payload: "error" });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const acceptReq = (_id) => async (dispatch, getState) => {
  const { token } = getState();
  //id of the request

  try {
    const res = await server.patch("/request/accept", { _id }, auth(token));

    console.log(res.data);

    dispatch(setUser(res.data));
    dispatch(getFriendRequests(token));
    //update the view user friends here
    dispatch({ type: "ACCEPT_REQ", payload: res.data.username });
  } catch (e) {
    console.log(e);
    dispatch({ type: "REQ_RESONSE_ERROR", payload: "error" });
  }
};

//////////////////////////////////////
//////////////////////////////////////

//_id of the friendrequest
export const unfriend = (username) => async (dispatch, getState) => {
  const { token } = getState();

  try {
    const res = await server.patch("/unfriend", { username }, auth(token));

    dispatch(setUser(res.data));
    dispatch(getFriendRequests(token));
    //update view user friends here
    dispatch({ type: "UNFRIEND", payload: res.data.username });
  } catch (e) {
    dispatch({ type: "UNFRIEND_ERROR", payload: "error" });
  }
};

//////////////////////////////////////
//////////////////////////////////////

//id of request
export const declineReq = (_id) => async (dispatch, getState) => {
  const { token } = getState();

  try {
    await server.delete("/request/decline", { data: { _id } }, auth(token));

    dispatch({ type: "DECLINE_REQ", payload: _id });
  } catch (e) {
    dispatch({ type: "DECLINE_REQ_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

//pass socketClient(ENDPOINT)
export const selectChat = (conversation_id, friend, socket) => {
  return {
    type: "SELECT_CHAT",
    payload: { username: friend, socket, room: conversation_id },
  };
};

//////////////////////////////////////
//////////////////////////////////////

///array = ['username', 'username']
export const createConvo = (arr) => async (dispatch, getState) => {
  const { token } = getState();

  try {
    const { data } = await server.post(
      "/newconversation",
      { participants: arr },
      auth(token)
    );

    dispatch({ type: "NEW_CONVO", payload: data });
  } catch (e) {
    dispatch({ type: "NEW_CONVO_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const getConvos = () => async (dispatch, getState) => {
  const { token } = getState();

  try {
    const { data } = await server.get("/conversation", auth(token));

    dispatch({ type: "CONVOS", payload: data });
  } catch (e) {
    dispatch({ type: "CONVOS_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const getChatHistory = (conversation_id) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await server.get("/message", {
      headers: { conversation_id },
    });

    dispatch({ type: "CHAT_HISTORY", payload: { conversation_id, data } });
  } catch (e) {
    console.log(e);
    dispatch({ type: "CHAT_HISTORY_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const newMessage = (message, conversation_id, socket) => async (
  dispatch,
  getState
) => {
  const { token } = getState();

  try {
    const { data } = await server.post(
      "/newmessage",
      { message, conversation_id },
      auth(token)
    );
    let room = conversation_id;
    socket.emit("sendMessage", room, data);
    dispatch({ type: "NEW_MESSAGE", payload: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "NEW_MESSAGE_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const receiveMessage = (data) => {
  return {
    type: "NEW_MESSAGE",
    payload: data,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const uploadAvatar = (file) => async (dispatch, getState) => {
  const { token } = getState();
  try {
    const res = await server.post("/image/avatar", file, auth(token));

    dispatch(getViewUser(res.data.username));
  } catch (e) {
    dispatch({ type: "AVATAR_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const editWorkoutImage = (file, workout_id) => async (
  dispatch,
  getState
) => {
  const { token, viewUser } = getState();
  try {
    await server.post(`/workout/image/${workout_id}`, file, auth(token));

    dispatch(getViewUser(viewUser.user.username));
  } catch (e) {
    console.log(e);
    dispatch({ type: "EDIT_IMAGE_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const deleteWorkout = (workout_id) => async (dispatch, getState) => {
  const { token, viewUser } = getState();
  try {
    await server.delete(`/workout/${workout_id}`, auth(token));
    await server.delete(`/image/${workout_id}`, auth(token));

    dispatch(getViewUser(viewUser.user.username));
  } catch (e) {
    dispatch({ type: "DELETE_WORKOUT_ERROR", payload: e });
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const filterFeed = (params) => {
  return {
    type: "FILTER_FEED",
    payload: params,
  };
};
