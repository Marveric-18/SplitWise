import React from "react";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import HorizontalScrollableGrid from "../../Global/HorizontalScrollableGrid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    overflowX: "auto",
    display: "flex",
    flexWrap: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar
    },
    padding: "5%",
  },
  horizontalHeader: {
    minWidth: "100%", 
    minHeight: "20px",
    margin: "1%" 
    
  },
});

const GroupDetailTab = ({ groupDetail }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleDetailButton = () => {
    console.log("Called")
    navigate( groupDetail?.group_id)
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {/* <Paper elevation={3}> */}
            {/* <div style={{ backgroundColor: "lightblue", height: "200px" }}> */}
              <Typography variant="subtitle1">
                Name: {groupDetail?.name}
              </Typography>
              <Typography variant="subtitle1">
                Admin: {groupDetail?.groupAdmin?.fullName}
              </Typography>
              <Typography variant="subtitle1">
                Total Expense: ${groupDetail?.totalExpenses}
              </Typography>
              <Button size="small" onClick={()=> handleDetailButton()}>Details</Button>
            {/* </div> */}
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <Paper elevation={3}> */}
          <Grid md={12} container spacing={2} className={classes.horizontalHeader}>
            <Typography variant="subtitle1">Group Users:</Typography>
          </Grid>
          <Grid md={12} container spacing={2} className={classes.root}>
            {/* <div style={{ backgroundColor: "lightgreen", height: "200px" }}> */}

            {groupDetail.users.map((each_user, index) => (
              <Grid each_user key={each_user.fullName}>
                <HorizontalScrollableGrid
                  header={each_user.fullName}
                  itemComponent={
                    <>
                    <AccountCircleIcon />
                    <Typography key={index} variant="body1">
                      {each_user.fullName}
                    </Typography>
                    </>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GroupDetailTab;
