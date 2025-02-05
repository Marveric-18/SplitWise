import React from "react";
import { Grid, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    overflowX: "auto",
    display: "flex",
    flexWrap: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar
    },
  },
  card: {
    minWidth: 200, // Adjust card width as needed
    marginRight: 8, // Adjust spacing between cards
  },
});

const HorizontalScrollableGrid = ({
  items,
  header,
  itemComponent,
}) => {
  const classes = useStyles();

  return (
    // <Grid container spacing={2} className={classes.root}>
      // {items.map((item) => (
        
          <Card className={classes.card}>
            <CardHeader variant={"subtitle1"} minWidth={"100%"}>
                <Typography>{header}</Typography>
            </CardHeader>
            <CardContent>
              {itemComponent && itemComponent}
            </CardContent>
          </Card>
        // </Grid>
      // ))}
    // </Grid>
  );
};

export default HorizontalScrollableGrid;
