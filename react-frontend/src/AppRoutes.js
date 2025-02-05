// Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Group from "./pages/Group";
import GroupInfo from "./pages/GroupInfo";
import Login from "./pages/Login/index";

import HomeLayout from "./layouts/HomeLayout";
import AuthLayout from "./layouts/AuthLayout";
import { AuthProvider } from "./utils/useAuth";

function AppRoutes() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" exact element={<HomeLayout title={"Home"} content={<Home />} />} />
            <Route path="/about" element={<HomeLayout title={"About"} content={<About />} />} />
            <Route path="/group" element={<HomeLayout title={"Group"} content={<Group />} />} />
            <Route path="/group/:groupId" element={<HomeLayout title={"Group Detail"} content={<GroupInfo />} />} />
            <Route path="/login" element={<AuthLayout content={<Login />} />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default AppRoutes;
