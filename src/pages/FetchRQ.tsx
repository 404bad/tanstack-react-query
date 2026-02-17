import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchpostsByTan } from "../api/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchRQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const postsPerPage = 5;

  const {
    data: posts = [],
    isPending,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"], // this is like useState
    queryFn: fetchpostsByTan, //this is like useEffect
    // gcTime: 1000,
    staleTime: 1000 * 5, // 5 sec
    // NOTE: we dont call function here  we just pass the reference
  });

  const toggleAccordion = (id: number): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const paginated = posts.slice(0, postsPerPage);

  return (
    <>
      <div className="page-heading">
        <h1>
          Latest <span>Posts</span>
        </h1>
        <p className="page-subheading">Browse all fetched entries</p>
      </div>

      {isPending && (
        <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading posts…</p>
      )}

      {isError && (
        <p
          style={{
            textAlign: "center",
            marginTop: "4rem",
            color: "var(--red)",
          }}
        >
          Failed to load posts.
        </p>
      )}

      {!isPending && !isError && (
        <ul className="section-accordion">
          {paginated.map((post) => {
            const isOpen = openId === post.id;
            return (
              <li key={post.id}>
                <div className="accordion-grid">
                  <p className="accordion-question">{post.title}</p>
                  <button
                    className={isOpen ? "active-btn" : ""}
                    onClick={() => toggleAccordion(post.id)}
                  >
                    {isOpen ? "Close" : "Read"}
                  </button>
                </div>
                {isOpen && (
                  <div className="accordion-answer">
                    <p>{post.body}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FetchRQ;
