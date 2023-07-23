import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { fetchPostDetails } from "../api/api";
import { useParams } from "react-router-dom";

function PostDetail(props) {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  useEffect(() => {
    fetchPostDetails(postId)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header />
      {postInfo && <h1>{postInfo.title}</h1>}
    </>
  );
}

export default PostDetail;
