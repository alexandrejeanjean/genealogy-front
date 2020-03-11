import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiClient from '../../api';
import { withUser } from '../../store/UserProvider';

import LocalStorageService from '../../services/LocalStorageService';

import LoginForm from './LoginForm';
import Main from '../Theme/index';

type Props = {
  setIsLogged: Function;
  isLogged: boolean;
};

function Login({ isLogged, setIsLogged }: Props) {
  const history = useHistory();

  const autoSignIn = async () => {
    try {
      const token = LocalStorageService._getAccessToken();
      console.log('user :: ', token);
      if (token) {
        setIsLogged(true);
        history.push('/dashboard');
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

  const signIn = async (credentials: object) => {
    try {
      const response = await apiClient.post('/signin', credentials);
      const user = response.data;
      console.log('user :: ', user);
      if (user.token) {
        setIsLogged(true);
        LocalStorageService._setToken(user);
        return history.push('/dashboard');
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log('Error :: signin', axiosError.response);
        return axiosError.response.data;
      }

      throw err;
    }
  };

  return (
    <Main>
      <LoginForm handleSubmit={signIn} />
    </Main>
  );
}

export default withUser(Login);
