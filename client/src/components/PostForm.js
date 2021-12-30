import React from "react";
import { TextField, Box, Button } from "@mui/material";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(data);
      const newData = {getPosts: [result.data.createPost, ...data.getPosts]};
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { ...newData } });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      onSubmit={handleSubmit}
    >
      <h2>Create a post:</h2>
      <TextField
        style={{ width: "100%" }}
        label="Body"
        name="body"
        size="small"
        type="text"
        value={values.body}
        onChange={handleChange}
      ></TextField>
      <Button type="submit" variant="outlined" size="small">
        Submit
      </Button>
    </Box>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
