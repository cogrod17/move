import history from "./history";

export const formatDate = (x) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(x);

  return `${
    months[d.getMonth()]
  } ${d.getDate()} at ${d.getHours()}:${d.getMinutes()} `;
};

/////////////////////

export const setViewUser = async (viewUsername, curUsername) => {
  if (viewUsername === curUsername) {
    history.push("/profile");
    return;
  }

  localStorage.setItem("viewUser", JSON.stringify(viewUsername));

  history.push("/viewuser");
};
