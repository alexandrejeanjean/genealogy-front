import React from 'react';
import Navbar from '../../SharedComponents/Navbar';
import { UserContext } from '../../store/UserProvider';

type Props = {
  children: any;
  isLogged?: boolean;
};

function Main({ children, isLogged }: Props) {
  return (
    <main>
      <UserContext.Consumer>{value => <Navbar isLogged={value.isLogged} />}</UserContext.Consumer>
      {children}
    </main>
  );
}

export default Main;
