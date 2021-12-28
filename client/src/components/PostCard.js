import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from '@mui/icons-material/Forum';
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  function likePost() {
    console.log("Like post");
  }

  function commentOnPost() {
    console.log("comemnt on post");
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
        <Button
          variant="outlined"
          size="small"
          startIcon={<FavoriteIcon />}
          onClick={likePost}
        >
          {likeCount}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ForumIcon />}
          onClick={commentOnPost}
        >
          {commentCount}
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
