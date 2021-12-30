import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Grid from "@mui/material/Grid";

import { AuthContext } from "../context/auth";
import Layout from "./Layout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <Layout>
      {user && (
        <Grid p={4}>
          <PostForm />
        </Grid>
      )}
      <Grid
        p={4}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid key={post.id} item xs={6} md={4}>
              <PostCard post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  );
}

export default Home;
