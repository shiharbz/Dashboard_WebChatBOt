import React, { useState, useEffect, useContext } from "react";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { Divider } from "@mui/material";

const drawerWidth = 240;

function SideBar (open,setOpen){
  const theme = useTheme();

  let navigate = useNavigate();

 

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div><br />

      <List sx={{ color: "#ffcc4f" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#228096",
              }}
            >
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Flows" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#228096",
              }}
            >
              {" "}
              <LiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary=" Q&A " />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#228096",
              }}
            >
              <LiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary="Chat Log" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ display: "block", color: "#ffcc4f" }}>
        {["Subscribe", "Profile", "Settings"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#228096",
                }}
              >
                {" "}
                <ShowChartIcon />
                {/* {index % 2 === 0 ? <MailIcon /> : <InboxIcon />} */}
              </ListItemIcon>
              <ListItemText sx={{ display: "hidden" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
