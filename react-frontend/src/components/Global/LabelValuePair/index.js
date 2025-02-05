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
    marginRight: "16px", // Adjust spacing between label and input as needed
  },
});

const LabelValuePair = ({ label, value, textSize = "body1", inputSize = "medium" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={textSize} className={classes.label}>
        {label}:
      </Typography>
      <TextField
        variant="standard"
        // fullWidth
        size={inputSize}
        value={value}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default LabelValuePair;
