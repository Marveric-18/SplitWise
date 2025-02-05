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
  input: {
    marginLeft: "0%", // Adjust spacing between label and input as needed
    padding: "0px"
  },
});

const CustomInput = ({ inputValue, inputSize = "small", readOnly=false  }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        className={classes.input}
        fullWidth
        size={inputSize}
        value={inputValue}
        InputProps={{
          readOnly: readOnly,
        }}
      />
    </div>
  );
};

export default CustomInput;
