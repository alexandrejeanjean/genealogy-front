import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./core/Routes";
import UserProvider from "./store/UserProvider";
import "./App.scss";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes />
      </Router>
    </UserProvider>
  );
};

export default App;
