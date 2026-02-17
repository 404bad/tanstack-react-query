import { useEffect, useState } from "react";
import { fetchpostsbyAxios } from "../api/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchOld = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const postsPerPage = 5;

  const getPostData = async (): Promise<void> => {
    try {
      const res = await fetchpostsbyAxios();
      if (res.status === 200) {
        setPosts(res.data as Post[]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  const toggleAccordion = (id: number): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const paginated = posts.slice(0, postsPerPage);

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
    </div>
  );
};

export default FetchOld;
