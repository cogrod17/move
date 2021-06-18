import { server } from "../api";
import history from "../history";
//////////////////////////////////////
//////////////////////////////////////

export const setUser = (user) => {
  console.log(user);
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
