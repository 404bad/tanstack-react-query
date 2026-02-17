import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchpostsByTan } from "../api/api";
import { NavLink } from "react-router-dom";
import type { Post } from "../types";

const POSTS_PER_PAGE = 5; // must match _limit in fetchpostsByTan
const TOTAL_POSTS = 100; // JSONPlaceholder has exactly 100 posts
const totalPages = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE); // = 20

const FetchRQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: posts = [],
    isPending,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts", currentPage], // this is like useState
    queryFn: () => fetchpostsByTan(currentPage), //this is like useEffect
    // gcTime: 1000, // 1 sec - this will garbage collect the data after 1 sec and it will refetch the data when we access it again
    //staleTime: 1000 * 5, // 5 sec - this will make the data fresh for 5 sec and it will not refetch the data until the data is stale
    refetchInterval: 1000 * 3, // 3 sec - this will refetch the data every 1 sec and update the UI if there is any change in the data
    // refetchIntervalInBackground: true, // this will refetch the data even when the tab is in background
    // NOTE: we dont call function here  we just pass the reference
  });

  const toggleAccordion = (id: number): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  const goTo = (page: number): void => {
    setCurrentPage(page);
    setOpenId(null);
  };

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
          {posts.map((post) => {
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
                    <NavLink className="viewdetails" to={`/rq/${post.id}`}>
                      View Details
                    </NavLink>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* ── Pagination ── */}
      <div className="pagination-section">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active-page" : ""}
            onClick={() => {
              setCurrentPage(page);
              setOpenId(null);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="pagination-section">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            opacity: currentPage === 1 ? 0.3 : 1,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 1.6rem",
            fontSize: "1.3rem",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.1rem",
            color: "var(--text-dim)",
            whiteSpace: "nowrap",
          }}
        >
          Page{" "}
          <span style={{ color: "var(--accent)", margin: "0 0.6rem" }}>
            {currentPage}
          </span>{" "}
          of {totalPages}
        </span>

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            opacity: currentPage === totalPages ? 0.3 : 1,
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FetchRQ;
