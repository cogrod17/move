import { useState, useEffect } from "react";

const useInfo = (userInfo, viewUserInfo) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    getInfo(userInfo, viewUserInfo);
  }, [userInfo, viewUserInfo]);

  const getInfo = (userInfo, viewUserInfo) => {
    return window.location.pathname === "/profile"
      ? setInfo(userInfo)
      : setInfo(viewUserInfo);
  };

  return [info, getInfo];
};

export default useInfo;
