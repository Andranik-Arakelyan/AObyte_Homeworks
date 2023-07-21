import React, { useEffect, useState } from "react";

import { Header, Posts, Panel } from "../../components";

import { fetchPosts } from "../../Api/api";
import { calculateAverages } from "../../helpers";

function Main(props) {
  const [loading, setLoading] = useState(false);
  const [pool, setPool] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchedNotFound, setSearchedNotFound] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setLoading(false);
        setAllPosts(calculateAverages(response.data));
        setPool(calculateAverages(response.data));
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const disableEnablePost = (id, status) => {
    const index = allPosts.findIndex((post) => id === post.id);
    const newPosts = [...allPosts];
    newPosts[index] = {
      ...newPosts[index],
      selected: status,
    };

    setAllPosts(newPosts);
  };

  const filterBySearch = (value) => {
    const comIncludes = (coms, value) => {
      for (let i = 0; i < coms.length; i++) {
        return coms[i].comment.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    };

    const filteredPosts = pool.filter((post) => {
      return comIncludes(post.comments, value);
    });

    if (!filteredPosts.length) {
      setSearchedNotFound(true);
    } else {
      setAllPosts(filteredPosts);
      setSearchedNotFound(false);
    }
  };

  return (
    <>
      <Header filter={filterBySearch} posts={pool} />
      {!loading && (
        <>
          {searchedNotFound ? <p>Nothing found</p> : <Posts posts={allPosts} />}
          <Panel posts={pool} changeStatus={disableEnablePost} />
        </>
      )}
    </>
  );
}

export default Main;
