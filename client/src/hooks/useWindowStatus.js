import { useState, useEffect } from "react";

const useWindowStatus = () => {
  const [windowStatus, setWindowStatus] = useState("user");

  useEffect(() => {
    getWindowStatus();
  }, []);

  const getWindowStatus = () => {
    return window.location.pathname === "/profile"
      ? setWindowStatus("user")
      : setWindowStatus("view");
  };

  return [windowStatus, getWindowStatus];
};

export default useWindowStatus;
