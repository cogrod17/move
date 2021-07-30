import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:3001",
});

//have to change this URL and the places where pictures are served
