import React from "react";
import { Button, Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import HorizontalScrollableGrid from "../../Global/HorizontalScrollableGrid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    margin: "1%",
  },
});

const ExpenseDetailTab = ({ expenseDetail }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleDetailButton = () => {
    navigate(expenseDetail?.id);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">
            Title: {expenseDetail?.title}
          </Typography>
          <Typography variant="subtitle1">
            Added By: {expenseDetail?.addedBy?.fullName}
          </Typography>
          <Typography variant="subtitle1">
            Total Expense: ${expenseDetail?.totalSharedExpense}
          </Typography>
          <Button size="small" onClick={() => handleDetailButton()}>
            Details
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid
            md={12}
            container
            spacing={2}
            className={classes.horizontalHeader}
          >
            <Typography variant="subtitle1">Shared By:</Typography>
          </Grid>
          <Grid md={12} container spacing={2} className={classes.root}>
            {expenseDetail.sharedExpenses.map((eachSharedExpense, index) => (
              <Grid  key={eachSharedExpense.id}>
                <HorizontalScrollableGrid
                  header={eachSharedExpense.sharedUsers?.fullName}
                  itemComponent={
                    <React.Fragment>
                      <AccountCircleIcon />
                      <Typography key={index} variant="body1">
                        {eachSharedExpense.sharedUsers?.fullName}
                      </Typography>
                    </React.Fragment>
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

export default ExpenseDetailTab;
