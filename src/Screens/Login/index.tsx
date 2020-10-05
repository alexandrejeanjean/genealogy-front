import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import apiClient, { setAuthorization } from "../../api";
import { withUser } from "../../store/UserProvider";
import { withToast } from "../../store/ToastProvider";
import { ErrorHandler } from "../../helpers";
import LocalStorageService from "../../services/LocalStorageService";

import LoginForm from "./LoginForm";
import Main from "../Theme/index";

type TLogin = {
  setIsLogged: Function;
  isLogged: boolean;
  setToastVisible: Function;
};

type TCredententials = {
  username: string;
  password: string;
};

type ServerError = { code: string; description: string };

const Login = ({ isLogged, setIsLogged, setToastVisible }: TLogin) => {
  const history = useHistory();
  const [isSignUp, setSignUpForm] = useState(false);

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

  // Post user credentials, store authorization token in local storage, set context user to logged in
  const submitForm = async (credentials: TCredententials) => {
    const endpoint = isSignUp ? "/signup" : "/signin";
    try {
      const response = await apiClient.post(endpoint, credentials);
      if (response) {
        if (endpoint === "/signup") {
          setToastVisible(true, "Successful registration! :) ", "success");
        }
        const user = response.data;
        if (user.token) {
          setAuthorization(user.token);
          setIsLogged(true);
          LocalStorageService._setToken(user);
          setToastVisible(true, "Logged in !", "success");
          return history.push("/dashboard");
        } else {
          setSignUpForm(false);
        }
      }
    } catch (err) {
      ErrorHandler(
        err,
        setToastVisible,
        endpoint === "/signup"
          ? "Username already exist."
          : "Wrong credentials. Try again, or contact us."
      );
    }
  };

  return (
    <Main>
      <section>
        <LoginForm
          handlesubmit={submitForm}
          isSignUp={isSignUp}
          setSignUpForm={(bool: boolean) => setSignUpForm(bool)}
        />
      </section>
    </Main>
  );
};

export default withUser(withToast(Login));
