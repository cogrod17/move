import { useState, useEffect } from "react";

//curuser = signed in user
//ciewUser = other one
const useFriendStatus = (curUser, viewUser, friendRequests) => {
  const [friendStatus, setFriendStatus] = useState({
    status: "loading",
    _id: null,
  });

  useEffect(() => {
    evaluate(curUser, viewUser, friendRequests);
  }, [curUser, viewUser, friendRequests]);

  const set = (status, _id = null) => {
    return { status, _id };
  };

  const evaluate = (user, viewUser, friendRequests) => {
    if (!user || !viewUser) return;
    let isFriend = user.friends.includes(viewUser.user.username);

    if (isFriend) {
      setFriendStatus(set("friends"));
    }

    const [pending] = friendRequests.sent.filter((item) => {
      return item.receiver === viewUser.user.username && item.status === 1;
    });

    if (pending) setFriendStatus(set("pending"));

    const [respond] = friendRequests.received.filter((item) => {
      return item.sender === viewUser.user.username && item.status === 1;
    });

    if (respond) setFriendStatus(set("respond", respond._id));

    if (!isFriend && !respond && !pending) setFriendStatus(set("not friends"));
  };

  return [friendStatus, evaluate];
};

export default useFriendStatus;
