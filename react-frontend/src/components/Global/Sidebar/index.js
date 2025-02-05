import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const drawerWidth = 240;

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#43C6AC",
    borderRight: `4px solid #191654`,
  },
}));

const ListContainer = styled(List)({
  width: "100%",
});

const ListItemContainer = styled(ListItem)(({ theme }) => ({
  color: "white",
  "&:hover": {
    backgroundColor: "#191654",
  },
}));

const SidebarToggle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarToggle onClick={toggleDrawer}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </SidebarToggle>
      <DrawerContainer variant="persistent" open={isOpen}>
        <ListContainer>
          <ListItemContainer component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemContainer>
          <ListItemContainer component={Link} to="/about">
            <ListItemText primary="About" />
          </ListItemContainer>
          <ListItemContainer component={Link} to="/group">
            <ListItemText primary="Groups" />
          </ListItemContainer>
          <ListItemContainer component={Link} to="/about">
            <ListItemText primary="All Users" />
          </ListItemContainer>
          <ListItemContainer component={Link} to="/about">
            <ListItemText primary="Statistics" />
          </ListItemContainer>
        </ListContainer>
      </DrawerContainer>
    </>
  );
}

export default Sidebar;
