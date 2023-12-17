import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";

const Main = () => {
  return (
    <div>
      <Header className="relative"></Header>
      <Outlet>
        
      </Outlet>
    </div>
  );
};

export default Main;
