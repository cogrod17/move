import axios from "axios";

export const server = axios.create({
  baseURL: window.location.origin,
  //baseURL: `http://localhost:3001`,
});
