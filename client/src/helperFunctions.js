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

export const getStatus = () => {
  return window.location.pathname === "/profile" ? "user" : "view";
};

/////////////////////
/////////////////////

export const searchRequests = (requests, viewUser) => {
  //requests will come from redux store
  //user will be the logged in user
  //viewUser is the username realtion in question

  //if the user sent a request
  let sent = requests.sent.filter((req) => req.receiver === viewUser);

  //if the user received a request
  let received = requests.received.filter((req) => req.sender === viewUser);

  if (sent) return sent;
  if (received) return received;
  if (!sent && !received) return "none";
};
