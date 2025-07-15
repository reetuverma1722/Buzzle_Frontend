import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { Logout, Search } from "@mui/icons-material";
const Appbar=()=>{
    const [logoutOpen, setLogoutOpen] = useState(false);
    return (
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
    )
}

export default Appbar
