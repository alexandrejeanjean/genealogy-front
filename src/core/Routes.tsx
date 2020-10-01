import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import { withUser } from "../store/UserProvider";

import LoadingLazyPage from "../SharedComponents/Loading/LoadingLazyPage";

const Login = React.lazy(() => import("../Screens/Login"));
const Family = React.lazy(() => import("../Screens/Family"));
const Dashboard = React.lazy(() => import("../Screens/Dashboard"));
const PageNotFound = React.lazy(() => import("../Screens/NotFound"));

type PRoutesProps = {
  exact: boolean;
  path: string;
  component: React.FC;
  isAuthenticated: boolean;
};

const PrivateRoute = ({
  component,
  isAuthenticated,
  ...rest
}: PRoutesProps) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

type RoutesProps = {
  isLogged: boolean;
};

const Routes = ({ isLogged }: RoutesProps) => (
  <React.Suspense fallback={LoadingLazyPage()}>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute
        exact
        path="/dashboard"
        component={Dashboard}
        isAuthenticated={isLogged}
      />
      <PrivateRoute
        exact
        path="/family"
        component={Family}
        isAuthenticated={isLogged}
      />
      <Route component={PageNotFound} />
    </Switch>
  </React.Suspense>
);

export default withUser(Routes);
