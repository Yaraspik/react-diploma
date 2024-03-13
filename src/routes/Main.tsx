import { Outlet } from "react-router-dom";
import Banner from "../components/Banner.tsx";
import React from "react";
const Main = ({ children }: { children?: React.JSX.Element }) => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {children ?? <Outlet />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
