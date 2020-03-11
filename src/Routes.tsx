import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import PageNotFound from './Screens/NotFound';
import { withUser } from './store/UserProvider';

type PRoutesProps = {
  exact: boolean;
  path: string;
  component: React.FC;
  isAuthenticated: boolean;
};

const PrivateRoute = ({ component, isAuthenticated, ...rest }: PRoutesProps) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/' }} />;
  return <Route {...rest} render={routeComponent} />;
};

type RoutesProps = {
  isLogged: boolean;
};

const Routes = ({ isLogged }: RoutesProps) => (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={isLogged} />
    <Route component={PageNotFound} />
  </Switch>
);

export default withUser(Routes);
