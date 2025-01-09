import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Navbar content={children} />
  );
};

export default Layout;
