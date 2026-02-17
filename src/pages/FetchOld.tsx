import { useEffect, useState } from "react";
import { fetchpostsbyAxios } from "../api/api";
import type { Post } from "../types";

const POSTS_PER_PAGE = 5;

const FetchOld = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getPostData = async (): Promise<void> => {
    try {
      const res = await fetchpostsbyAxios();
      if (res.status === 200) {
        setPosts(res.data as Post[]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const toggleAccordion = (id: number): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const goTo = (page: number): void => {
    setCurrentPage(page);
    setOpenId(null);
  };

  // Client-side slice — all posts are in memory, we just slice the right chunk
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading posts…</p>
    );
  }

  if (error) {
    return (
      <p
        style={{ textAlign: "center", marginTop: "4rem", color: "var(--red)" }}
      >
        Failed to load posts.
      </p>
    );
  }

  return (
    <div>
      <div className="page-heading">
        <h1>
          Latest <span>Posts</span>
        </h1>
        <p className="page-subheading">Browse all fetched entries</p>
      </div>

      {/* ── Accordion List ── */}
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

      {/* ── Pagination: Prev | Page X of Y | Next ── */}
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
    </div>
  );
};

export default FetchOld;
