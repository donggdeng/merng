import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import gql from 'graphql-tag';


function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
      variables: {postId: id}
  })

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <Button
      variant={liked ? "contained" : "outlined"}
      size="small"
      startIcon={<FavoriteIcon />}
      onClick={user ? likePost : navigateToLogin}
    >
      {likeCount} 
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`;

export default LikeButton;
