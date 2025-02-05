import React from "react";
import { styled } from "@mui/system";
import { AuthProvider } from "../utils/useAuth";

const AuthLayoutContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const AuthHeader = styled("header")({
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
});

const AuthContentContainer = styled("div")({
  textAlign: "center",
});

function AuthLayout({ content }) {
  return (
    <AuthLayoutContainer>
      <AuthHeader>SplitWise</AuthHeader>
      <AuthContentContainer>
        {content}
      </AuthContentContainer>
    </AuthLayoutContainer>
  );
}

export default AuthLayout;
