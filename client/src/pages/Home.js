import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Grid from "@mui/material/Grid";

import Layout from "./Layout";
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Layout>
      <Grid p={4} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid key={post.id} item xs={6} md={4}>
                <PostCard post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
