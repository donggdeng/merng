import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Grid } from "@mui/material";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function commentOnPost() {
    navigate(`/posts/${id}`);
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {username}
        </Typography>

        <Typography
          className="link"
          component={Link}
          to={`/posts/${id}`}
          sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {moment(createdAt).fromNow(true)}
        </Typography>
        <Typography variant="body2">
          {body}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          variant="outlined"
          size="small"
          startIcon={<ForumIcon />}
          onClick={commentOnPost}
        >
          {commentCount}
        </Button>
        {user && user.username === username && (
          <Grid container justifyContent="flex-end">
            <IconButton
              color="error"
              onClick={() => console.log("Delete post")}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
}

export default PostCard;
