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

export const getUserStatus = () => {
  return window.location.pathname === "/profile" ? "user" : "view";
};

/////////////////////
/////////////////////

//both should be the usernames
export const getFriendStatus = (user, viewUser, friendRequests) => {
  if (user.friends.includes(viewUser.user.username)) return "friends";

  //if the user sent a request
  let sent = friendRequests.sent.filter(
    (req) => req.receiver === viewUser.user.username && req.status === 1
  );
  if (sent.length >= 1) return "sent";

  //if the user received a request
  let received = friendRequests.received.filter(
    (req) => req.sender === viewUser.user.username && req.status === 1
  );
  if (received.length >= 1) return "respond";

  return "not friends";
};
