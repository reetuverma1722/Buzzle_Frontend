import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
  Grid,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Logout, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutDialog from "../Components/logoutDialog/LogoutDialog";
import TweetReplyTable from "../Components/tweet-reply-table/TweetReplyTable";
import { sampleTweets } from "../constants";
import Sidebar from "../Components/sideBar/sideBar";
import Appbar from "../Components/appBar/appBar";

const drawerWidth = 200;

const Dashboard = () => {
  const [keyword, setKeyword] = useState("");
  const [tweets, setTweets] = useState([]);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutOpen(false);
    navigate("/login");
  };

  const searchTweets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?keyword=${keyword}`
      );
      setTweets(res.data.data || []);
    } catch (err) {
      console.log("still there")
      console.error("Search failed", err);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LogoutDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />

     <Sidebar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#1976d2",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Buzzly
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar alt="User" src="/profile.jpg" />
              <IconButton color="inherit" onClick={() => setLogoutOpen(true)}>
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Box sx={{ p: 3 }}>
          <div style={{ flex: 1, padding: "2rem" }}>
            {active === "post-manager" ? (
              <TweetReplyTable tweets={sampleTweets} />
            ) : (
              <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "#fff",
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      px: 2,
                    }}
                  >
                    <Search color="action" />
                    <InputBase
                      placeholder="Enter keyword"
                      fullWidth
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" fullWidth onClick={searchTweets}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>

          <Grid container spacing={2}>
            {tweets.map((tweet, i) => (
              <Grid item xs={12} key={i}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">{tweet.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Likes: {tweet.public_metrics?.like_count} | Retweets:{" "}
                      {tweet.public_metrics?.retweet_count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;