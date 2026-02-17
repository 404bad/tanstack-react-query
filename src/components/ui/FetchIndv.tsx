import { useQuery } from "@tanstack/react-query";
import { fetchpostById } from "../../api/api";
import { useParams } from "react-router-dom";

import type { Post } from "../../types";

const FetchIndv = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchpostById(Number(id)),
    enabled: !!id, // ensures query only runs if id exists
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading post</p>;
  if (!data) return <p>No post found</p>;

  return (
    <div>
      <div className="section-accordion">
        <div className="accordion-item">
          <div className="accordion-grid">
            <p className="accordion-question">{data.title}</p>
          </div>
          <div className="accordion-answer">
            <p>{data.body}</p>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FetchIndv;
