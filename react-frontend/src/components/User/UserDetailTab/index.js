import React from "react";
import {
  Grid,
  Typography,
  Button
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "0%",
  },
});

const goToUser = () => {
    console.log("Called")
}

const UserDetailTab = ({ userDetail }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1">
          Name: {userDetail?.fullName}
        </Typography>
        <Typography variant="subtitle1">
          Email: {userDetail?.email}
        </Typography>
        <Button size="small" onClick={goToUser}>Learn More</Button>
        {/* Add more user details here if needed */}
      </Grid>
      {/* You can add more user details here if needed */}
    </Grid>
  );
};

export default UserDetailTab;