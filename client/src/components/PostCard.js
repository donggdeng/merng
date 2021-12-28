import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from 'moment';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {username}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {moment(createdAt).fromNow()}
        </Typography>
        <Typography variant="body2">
          {body}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
