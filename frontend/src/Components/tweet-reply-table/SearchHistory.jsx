import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReply, setSelectedReply] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/search/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err.message);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await axios.delete(`http://localhost:5000/api/search/delete/${tweetId}`);
      setHistory((prev) => prev.filter((tweet) => tweet.id !== tweetId));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

    return (
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ m: 2 }}>
          📜 Search History
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Keyword</b>
              </TableCell>
              <TableCell>
                <b>Tweet</b>
              </TableCell>
              <TableCell>
                <b>Reply</b>
              </TableCell>
              <TableCell>
                <b>Likes</b>
              </TableCell>
              <TableCell>
                <b>Retweets</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((tweet) => (
              <TableRow key={tweet.id}>
                <TableCell>{tweet.keyword}</TableCell>
               <TableCell>
  <Tooltip title={tweet.text} placement="top" arrow>
    <span>
      {tweet.text.split(" ").slice(0, 16).join(" ")}
      {tweet.text.split(" ").length > 16 &&  (
        <Button
          variant="text"
          size="small"
          sx={{
            color: "#1976d2",               // blue color
            textTransform: "none",
            textDecoration: "underline",
            minWidth: "auto",
            padding: 0,
            ml: 1,
          }}
        >
          Read more
        </Button>
      )}
    </span>
  </Tooltip>
</TableCell>

              <TableCell>
  <Tooltip title={tweet.reply} placement="top" arrow>
    <span>
      {tweet.reply?.split(" ").slice(0, 20).join(" ")}
      {tweet.reply?.split(" ").length > 20 &&  (
        <Button
          variant="text"
          size="small"
          sx={{
            color: "#1976d2",               // blue color
            textTransform: "none",
            textDecoration: "underline",
            minWidth: "auto",
            padding: 0,
            ml: 1,
          }}
        >
          Read more
        </Button>
      )}
    </span>
  </Tooltip>
</TableCell>

                <TableCell>{tweet.like_count}</TableCell>
                <TableCell>{tweet.retweet_count}</TableCell>
                <TableCell>
                  <Grid sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => alert("Edit not implemented yet")}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tweet.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                    <Button style={{ backgroundColor: "green", color: "white" }}>
                      Post
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default SearchHistory;
