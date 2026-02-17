import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data
export const fetchpostsbyAxios = () => {
  return api.get("/posts");
};

// we dont need axios for tan stack
export const fetchpostsByTan = async (currentPage: number) => {
  const limit = 5;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * 3}&_limit=${limit}`,
  );
  return res.status == 200 ? res.json() : [];
};

//fetch individual post by id
export const fetchpostById = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.status == 200 ? res.json() : null;
};
