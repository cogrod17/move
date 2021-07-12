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

export const signInWithToken = (token) => async (dispatch) => {
  try {
    const res = await server.get("/profile/user", auth(token));

    await dispatch(setUser(res.data));
    await dispatch(setToken(token));
    await dispatch(getWorkoutHistory(token));
    await dispatch(getFriendRequests(token));
    await dispatch(getSummary(token));

    if (window.location.pathname === "/") history.push("/profile");
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

    console.log(res);

    await dispatch(setUser(res.data.user));
    await dispatch(setToken(res.data.token));
    console.log("here");
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

    console.log(res);

    dispatch(setUser(res.data.user));
    dispatch(setToken(res.data.token));
    history.push("profile");
  } catch (e) {
    console.log("error in the action creater");
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const logout = (token) => async (dispatch) => {
  try {
    await server.post("/logout", {}, auth(token));

    await dispatch(setToken(null));
    await dispatch(setUser(null));
    dispatch(closeModal());
    localStorage.clear();
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////////////
//////////////////////////////////////

export const getWorkoutHistory = (token) => async (dispatch) => {
  try {
    const res = await server.get("/workout/history", auth(token));

    dispatch({ type: "WORKOUT_HISTORY", payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

////////////////////////////////////
//////////////////////////////////////

export const createWorkout = (values) => async (dispatch, getState) => {
  try {
    const res = await server.post("/workout", values, auth(getState().token));

    dispatch({ type: "NEW_WORKOUT", payload: res.data });
  } catch (e) {
    dispatch({ type: "NEW_WORKOUT_ERROR", payload: null });
    console.log(e);
  }
};

////////////////////////////////////
//////////////////////////////////////

export const getSummary = (token) => async (dispatch) => {
  try {
    const res = await server.get("/summary", auth(token));

    dispatch({ type: "GET_SUMMARY", payload: res.data });
  } catch (e) {
    dispatch({ type: "GET_SUMMARY_ERROR", payload: e });
  }
};

////////////////////////////////////
//////////////////////////////////////

export const getFeed = (token) => async (dispatch) => {
  try {
    const res = await server.get("/feed", auth(token));

    dispatch({ type: "FEED", payload: res.data });
  } catch (e) {
    console.log(e);
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

export const getViewUser = () => async (dispatch, getState) => {
  const username = JSON.parse(localStorage.getItem("viewUser"));
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
    console.log(e);
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

    //dispatch({ type: "NEW_FRIEND", payload: res.data.sender });
    dispatch(setUser(res.data));
  } catch (e) {
    dispatch({ type: "REQ_RESONSE_ERROR", payload: "error" });
  }
};

//////////////////////////////////////
//////////////////////////////////////

//_id of the friendrequest
export const unfriend = (username) => async (dispatch, getState) => {
  const { token } = getState();

  try {
    const res = await server.patch(
      "/request/unfriend",
      { username },
      auth(token)
    );

    dispatch(setUser(res.data));
    dispatch(getFriendRequests(token));
    dispatch(getViewUser());
  } catch (e) {
    console.log(e);
    dispatch({ type: "UNFRIEND_ERROR", payload: "error" });
  }
};

// export const getFriendStatus = (user, viewUser, friendRequests) => {
//   //if (!user || !viewUser || !friendRequests) return;
//   const FRIEND_STATUS = "FRIEND_STATUS";

//   let send = (payload) => {
//     return { type: FRIEND_STATUS, payload };
//   };

//   if (user.friends.includes(viewUser.user.username)) return send("friends");

//   //if the user sent a request
//   let sent = friendRequests.sent.filter(
//     (req) => req.receiver === viewUser.user.username && req.status === 1
//   );
//   if (sent.length >= 1) return send("sent");

//   //if the user received a request
//   let received = friendRequests.received.filter(
//     (req) => req.sender === viewUser.user.username && req.status === 1
//   );
//   if (received.length >= 1) return sent("respond");

//   return send("not friends");
// };
