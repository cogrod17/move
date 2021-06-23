import { server } from "../api";
import history from "../history";
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
    const res = await server.get("/profile/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);

    await dispatch(setUser(res.data));
    await dispatch(setToken(token));

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
    const res = await server.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("here");

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
    const res = await server.get("/workout/history", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "WORKOUT_HISTORY", payload: res.data });
  } catch (e) {
    console.log(e);
  }
};
