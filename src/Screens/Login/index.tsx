import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import apiClient, { setAuthorization } from "../../api";
import { withUser } from "../../store/UserProvider";
import LocalStorageService from "../../services/LocalStorageService";

import LoginForm from "./LoginForm";
import Main from "../Theme/index";

type TLogin = {
  setIsLogged: Function;
  isLogged: boolean;
};

type TCredententials = {
  username: string;
  password: string;
};

type ServerError = { code: string; description: string };

const Login = ({ isLogged, setIsLogged }: TLogin) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");

  // Sign user if token already stored in local storage
  const autoSignIn = async () => {
    try {
      const token = LocalStorageService._getAccessToken();

      if (token) {
        setAuthorization(token);
        setIsLogged(true);
        history.push("/dashboard");
      }
    } catch (err) {
      if (err) {
        return err;
      }
    }
  };

  useEffect(() => {
    if (!isLogged) {
      autoSignIn();
    }
  });

  // Post user credentials,  store authorization token in local storage, set context user to logged in
  const signIn = async (credentials: TCredententials) => {
    try {
      const response = await apiClient.post("/signin", credentials);
      if (response) {
        console.log("response", response);
        const user = response.data;

        if (user.token) {
          setAuthorization(user.token);
          setIsLogged(true);
          LocalStorageService._setToken(user);
          return history.push("/dashboard");
        }
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: signin", axiosError.response);
        setErrorMsg("Wrong credentials. Try again, or contact us.");
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }

      throw err;
    }
  };

  return (
    <Main>
      <span>ENDPOINT :: {process.env.REACT_APP_API_URL}</span>
      <LoginForm handleSubmit={signIn} errorMsg={errorMsg} />
    </Main>
  );
};

export default withUser(Login);
