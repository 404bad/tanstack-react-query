// InfiniteUsers.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import type { GitHubUser } from "../types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteUsers = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: GitHubUser[], allPages: GitHubUser[][]) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
  console.log(data);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <div className="page-heading">
        <h1>
          Github <span>Users</span>
        </h1>
        <p className="page-subheading">
          Infinite scroll — powered by Tanstack Query
        </p>
      </div>
      <div className="users-wrapper">
        {data?.pages?.map((page, index) => (
          <ul key={index}>
            {page.map((user) => (
              <li key={user.id}>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width={50}
                  height={50}
                />
                <p>{user.login}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Scroll down to load more"
            : "No more users"}
      </div>
    </div>
  );
};

export default InfiniteUsers;
