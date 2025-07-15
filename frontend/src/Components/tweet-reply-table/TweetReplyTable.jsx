import React, { useState } from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  Typography,
  Stack,
} from "@mui/material";

const TweetReplyTable = ({ tweets }) => {
  const [newReply, setNewReply] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedReply, setEditedReply] = useState("");

  const handleAddReply = (tweetIndex) => {
    if (!newReply.trim()) return;

    tweets[tweetIndex].replies.push({
      text: newReply,
      type: "manual",
    });

    setNewReply("");
  };

  const handleEditReply = (tweetIndex, replyIndex) => {
    setEditIndex({ tweetIndex, replyIndex });
    setEditedReply(tweets[tweetIndex].replies[replyIndex].text);
  };

  const handleSaveEditedReply = () => {
    const { tweetIndex, replyIndex } = editIndex;
    tweets[tweetIndex].replies[replyIndex].text = editedReply;
    setEditIndex(null);
    setEditedReply("");
  };

  const handleDeleteReply = (tweetIndex, replyIndex) => {
    tweets[tweetIndex].replies.splice(replyIndex, 1);
    setEditIndex(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell>Tweet</TableCell>
            <TableCell>Replies</TableCell>
            <TableCell>Add Reply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tweets.map((tweet, tweetIndex) => (
            <TableRow key={tweet.id}>
              <TableCell>
                <Typography fontWeight="bold">{tweet.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  @{tweet.handle}
                </Typography>
                <Typography variant="caption" display="block">
                  {tweet.timestamp}
                </Typography>
              </TableCell>
              <TableCell>{tweet.content}</TableCell>
              <TableCell>
                {tweet.replies.map((reply, replyIndex) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    key={replyIndex}
                    sx={{ mb: 1 }}
                  >
                    {editIndex?.tweetIndex === tweetIndex &&
                    editIndex?.replyIndex === replyIndex ? (
                      <>
                        <TextField
                          size="small"
                          value={editedReply}
                          onChange={(e) => setEditedReply(e.target.value)}
                        />
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleSaveEditedReply}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography>{reply.text}</Typography>

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            handleEditReply(tweetIndex, replyIndex)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteReply(tweetIndex, replyIndex)
                          }
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Stack>
                ))}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    placeholder="Write a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleAddReply(tweetIndex)}
                  >
                    Set
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TweetReplyTable;