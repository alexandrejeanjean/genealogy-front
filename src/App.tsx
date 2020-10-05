import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./core/Routes";
import UserProvider from "./store/UserProvider";
import ToastProvider from "./store/ToastProvider";
import "./App.scss";

const App = () => {
  return (
    <UserProvider>
      <ToastProvider>
        <Router>
          <Routes />
        </Router>
      </ToastProvider>
    </UserProvider>
  );
};

export default App;
