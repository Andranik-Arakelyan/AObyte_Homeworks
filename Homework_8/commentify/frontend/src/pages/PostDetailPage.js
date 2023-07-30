import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { fetchPostDetails } from "../api/api";
import { useParams } from "react-router-dom";
import { PostDetail } from "../components";

function PostDetailPage(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetchPostDetails(postId)
      .then((response) => {
        setPostInfo(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [postId]);

  return (
    <>
      <Header />
      {!loading && (
        <PostDetail
          title={postInfo.title}
          description={postInfo.description}
          comments={postInfo.comments}
          imageUrl={postInfo.imageUrl}
          id={postInfo.id}
        />
      )}
    </>
  );
}

export default PostDetailPage;
