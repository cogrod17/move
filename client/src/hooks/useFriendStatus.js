import { useState, useEffect, useCallback } from "react";

//curuser = signed in user
//ciewUser = other one
const useFriendStatus = (curUser, viewUser, friendRequests) => {
  const [friendStatus, setFriendStatus] = useState({
    status: "loading",
    _id: null,
  });

  const evaluate = useCallback((user, viewUser, friendRequests) => {
    const set = (status, _id = null) => {
      return { status, _id };
    };

    if (!user || !viewUser || !friendRequests)
      return setFriendStatus(set("loading"));

    let isFriend = user.friends.includes(viewUser.user.username);

    if (isFriend) {
      setFriendStatus(set("friends"));
    }

    const [pending] = friendRequests.filter((item) => {
      return item.receiver === viewUser.user.username && item.status === 1;
    });

    if (pending) setFriendStatus(set("pending"));

    const [respond] = friendRequests.filter((item) => {
      return item.sender === viewUser.user.username && item.status === 1;
    });

    if (respond) setFriendStatus(set("respond", respond._id));

    if (!isFriend && !respond && !pending) setFriendStatus(set("not friends"));
  }, []);

  useEffect(() => {
    evaluate(curUser, viewUser, friendRequests);
  }, [evaluate, curUser, viewUser, friendRequests]);

  return [friendStatus, evaluate];
};

export default useFriendStatus;
