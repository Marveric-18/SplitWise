import React from "react";
import { Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    fontFamily: "Nunito",
  },
  label: {
    marginLeft: "0%", // Adjust spacing between label and input as needed
    padding: "0px"
  },
});

const CustomLabel = ({ label, textSize = "body1" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={textSize} className={classes.label}>
        {label}:
      </Typography>
    </div>
  );
};

export default CustomLabel;
