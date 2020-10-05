import React from "react";
import Navbar from "../../SharedComponents/Navbar";
import { withUser } from "../../store/UserProvider";
import PageTitle from "../../SharedComponents/PageTitle/PageTitle";
import "./theme.scss";

type Props = {
  children: React.ReactNode;
  isLogged?: boolean;
  pageTitle?: string;
};

const Main = ({ children, isLogged, pageTitle }: Props) => {
  return (
    <>
      <Navbar isLogged={isLogged} />
      <main className="main-theme-wrapper">
        <PageTitle pageTitle={pageTitle} />
        {children}
      </main>
    </>
  );
};

export default withUser(Main);
