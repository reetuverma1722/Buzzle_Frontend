import React from "react";
import {
  Toolbar,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/history")}>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button onClick={() => navigate("/export-tools")}>
            <ListItemText primary="Export Tools" />
          </ListItem>
          <ListItem button onClick={() => navigate("/postmanager")}>
            <ListItemText primary="Post Manager" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
