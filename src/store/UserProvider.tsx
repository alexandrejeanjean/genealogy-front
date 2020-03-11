import React, { createContext, Component } from "react";

export const UserContext = createContext({
  isLogged: false,
  setIsLogged: (status: boolean) => {},
});

type Props = {}

type State = {
  isLogged: boolean,
  setIsLogged: Function
}

class UserProvider extends Component<Props, State> {
  state = {
    isLogged: false, 
    setIsLogged: (status: boolean) => this.setState({isLogged: status})
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const withUser = (Component: any) => (props: any) => (
  <UserContext.Consumer>
    {store => <Component {...props} {...store} />}
  </UserContext.Consumer>
)

export default UserProvider;
