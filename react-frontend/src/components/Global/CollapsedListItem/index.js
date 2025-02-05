import React, { useEffect, useState } from "react";
import {
  Card,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CollapsedListItem = ({ item_id, item_header, itemComponent }) => {
  const [openTab, setOpenTab] = useState(false);

  const handleOpenTab = () => {
    // Define handleGroupClick function
    setOpenTab((prev) => !prev);
  };

  return (
    <>
      <ListItem key={item_id} onClick={handleOpenTab}>
        <Paper style={{ padding: "inherit", width: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ListItemText ><span style={{fontWeight: "bold"}}>{item_header}</span></ListItemText>
            <ExpandMoreIcon />
          </div>

          <Collapse orientation="vertical" in={openTab}>
            {itemComponent}
          </Collapse>
        </Paper>
      </ListItem>
    </>
  );
};

export default CollapsedListItem;
