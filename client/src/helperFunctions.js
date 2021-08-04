import history from "./history";

export const formatDate = (x) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(x);

  return `${
    months[d.getMonth()]
  } ${d.getDate()} at ${d.getHours()}:${d.getMinutes()} `;
};

/////////////////////
/////////////////////

export const setViewUser = async (viewUsername, curUsername) => {
  if (viewUsername === curUsername) {
    history.push("/profile");
    return;
  }

  localStorage.setItem("viewUser", JSON.stringify(viewUsername));
  history.push("/viewuser");
};

/////////////////////
/////////////////////

export const sortByDate = (a, b) => {
  return new Date(b.date) - new Date(a.date);
};

/////////////////////
/////////////////////

export const getUserStatus = () => {
  return window.location.pathname === "/profile" ? "user" : "view";
};

/////////////////////
/////////////////////
