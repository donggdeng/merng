import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Layout from "./Layout";
import PostCard from "../components/PostCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Layout>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid item xs={4}>
              <Item>
                <PostCard key={post.id} post={post} />
              </Item>
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
