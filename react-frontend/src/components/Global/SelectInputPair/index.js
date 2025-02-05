// import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

// const useStyles = makeStyles({
//   rootContainer: {
//     width: "100%",
//     display: "flex",
//   },
//   selectChild: {
//     width: "55%",
//     padding: "4%"
//   },
//   inputChild: {
//     width: "45%",
//     padding: "4%"
//   },
// });
const SelectInputPair = ({
  label,
  value,
  checked,
  handleToggle,
}) => {
  
  const labelId = `checkbox-list-secondary-label-${value}`;
  return (
    <ListItem
      key={value}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(value)}
          checked={checked.indexOf(value) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${label}`}
            src={`/static/images/avatar/${value + 1}.jpg`}
          />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={`${label}`} />
      </ListItemButton>
  </ListItem>
  );
};

export default SelectInputPair;
