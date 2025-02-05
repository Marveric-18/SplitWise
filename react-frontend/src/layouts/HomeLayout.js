import React from "react";
import { fontWeight, padding, styled } from "@mui/system";
import Sidebar from "../components/Global/Sidebar";
import { Typography } from "@mui/material";

const RootContainer = styled("div")({
  display: "flex",
});

const ContentContainer = styled("main")(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: "#F5F5F5",
  minHeight: "100vh",
  // padding: theme.spacing(3),
}));

const HeaderContainer = styled("header")(({ theme }) => ({
  backgroundColor: "#F0F0F0",
  color: "black",
  padding: theme.spacing(1),
  fontSize: "35px",
  fontWeight: "bolder",
  fontFamily: "inherit",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
}));

const MainContentContainer = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const HomeLayout = ({ title, content }) => {
  return (
    <RootContainer>
      <Sidebar />
      <ContentContainer>
        <HeaderContainer>
          <Typography variant="h4" style={{fontFamily: "Nunito", paddingLeft: "1%"}}>
            {title}
          </Typography>
        </HeaderContainer>
        <MainContentContainer>
          {/* Render main content */}
          {content}
        </MainContentContainer>
      </ContentContainer>
    </RootContainer>
  );
};

export default HomeLayout;
