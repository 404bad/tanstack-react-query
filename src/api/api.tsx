import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data
export const fetchpostsbyAxios = () => {
  return api.get("/posts");
};

// we dont need axios for tan stack
export const fetchpostsByTan = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.status == 200 ? res.json() : [];
};
