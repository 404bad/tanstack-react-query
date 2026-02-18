import axios from "axios";
import type { GitHubUser, Post } from "../types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data
export const fetchpostsbyAxios = () => {
  return api.get("/posts");
};

// we dont need axios for tan stack
export const fetchpostsByTan = async (currentPage: number): Promise<Post[]> => {
  const limit = 5;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * limit}&_limit=${limit}`,
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();
  return data;
};

//fetch individual post by id
export const fetchpostById = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.status == 200 ? res.json() : null;
};

export const deletePost = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res;
};

// Update Post
export const updatePost = async (id: number, updatedPost: Partial<Post>) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
};

//fetech user for infinite scrolling

export const fetchUsers = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<GitHubUser[]> => {
  const res = await axios.get<GitHubUser[]>(
    `https://api.github.com/users?per_page=10&page=${pageParam}`,
  );
  return res.data;
};
