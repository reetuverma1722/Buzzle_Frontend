import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  CircularProgress,
  Typography,
  Grid,
  Slider,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const mockTrending = [
  "AI",
  "Election2024",
  "Cricket",
  "TechNews",
  "Startup",
  "NASA",
  // 🔽 Digital Marketing Related Topics
  "DigitalMarketing",
  "SEO",
  "ContentMarketing",
  "SocialMediaMarketing",
  "GoogleAds",
  "FacebookAds",
  "MarketingTips",
  "InfluencerMarketing",
  "EmailMarketing",
  "GrowthHacking",
  "PerformanceMarketing",
  "BrandStrategy",
  "LinkedInMarketing",
  "InstagramMarketing",
];


const Keyword_Management = () => {
  const [keywords, setKeywords] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [likesFilter, setLikesFilter] = useState(0);
  const [retweetsFilter, setRetweetsFilter] = useState(0);
  const [followersFilter, setFollowersFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  const handleAddKeyword = () => {
    if (inputKeyword.trim() && !keywords.includes(inputKeyword.trim())) {
      setKeywords((prev) => [...prev, inputKeyword.trim()]);
      setInputKeyword("");
    }
  };

  const handleDeleteKeyword = (k) => {
    setKeywords((prev) => prev.filter((key) => key !== k));
  };

  const handleSelectTrending = (k) => {
    if (!keywords.includes(k)) {
      setKeywords((prev) => [...prev, k]);
    }
  };

  const searchTweetsWithFilters = async () => {
    if (keywords.length === 0) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/search", {
        params: {
          keyword: keywords.join(","), // "modi,cricket"
          minLikes: likesFilter,
          minRetweets: retweetsFilter,
          minFollowers: followersFilter,
        },
      });
      setTweets(res.data.tweets || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

 const clearAllFilters = () => {
  // setKeywords([]); // clear keywords
  setLikesFilter(0); // reset filters
  setRetweetsFilter(0);
  setFollowersFilter(0);
  setTweets([]); // ❗ Clear tweets result also
};


  return (
    <Grid container spacing={2} direction="column" p={3}>
      <Typography variant="h5">Search Twitter Posts</Typography>

      {/* Keyword Input */}
      <Grid item>
        <TextField
          fullWidth
          label="Enter keyword"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddKeyword();
          }}
        />
        <Button variant="contained" onClick={handleAddKeyword} sx={{ mt: 1 }}>
          Add Keyword
        </Button>
      </Grid>

      {/* Added Keywords */}
      <Grid item>
        {keywords.map((k) => (
          <Chip
            key={k}
            label={k}
            onDelete={() => handleDeleteKeyword(k)}
            color="primary"
            sx={{ mr: 1, mt: 1 }}
          />
        ))}
      </Grid>

      {/* Trending Keywords */}
      <Grid item>
        <Typography variant="subtitle1">Or pick trending topics:</Typography>
        {mockTrending.map((t) => (
          <Chip
            key={t}
            label={t}
            variant="outlined"
            onClick={() => handleSelectTrending(t)}
            sx={{ mr: 1, mt: 1 }}
          />
        ))}
      </Grid>

      {/* Filters */}
      <Grid item>
        <Typography>Min Likes: {likesFilter}</Typography>
        <Slider
          value={likesFilter}
          min={0}
          max={1000}
          step={10}
          onChange={(_, val) => setLikesFilter(val)}
        />
        <Typography>Min Retweets: {retweetsFilter}</Typography>
        <Slider
          value={retweetsFilter}
          min={0}
          max={1000}
          step={10}
          onChange={(_, val) => setRetweetsFilter(val)}
        />
        <Typography>Min Followers: {followersFilter}</Typography>
        <Slider
          value={followersFilter}
          min={0}
          max={100000}
          step={1000}
          onChange={(_, val) => setFollowersFilter(val)}
        />
      </Grid>

      {/* Buttons */}
      <Grid item container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={searchTweetsWithFilters}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Search Tweets"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </Grid>
      </Grid>

      {/* Results */}
      {tweets.length > 0 && keywords.length > 0 && (
      <Grid item>
        
        <Typography variant="h6" mt={3}>
          Results ({tweets.length})
        </Typography>

        {tweets.map((tweet, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: "1px solid #ccc",
              margin: "10px 0",
              paddingBottom: "10px",
            }}
          >  <Card>
                        <CardContent>
            <Typography>{tweet.text}</Typography>
            <Typography variant="caption">
              ❤️ {tweet?.like_count ?? 0} | 🔁 {tweet?.retweet_count ?? 0} | 👤
              Followers: {tweet.followers_count ?? 0}
            </Typography>
            </CardContent>
            </Card>
          </div>
        ))}
      </Grid>)}
    </Grid>
  );
};

export default Keyword_Management;
