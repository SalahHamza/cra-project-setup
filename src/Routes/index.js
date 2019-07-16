import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import UnauthenticatedRoute from "Components/Auth/UnauthenticatedRoute";
import AuthenticatedRoute from "Components/Auth/AuthenticatedRoute";
import storeContext from "context";

// lazy loaded routes
const Login = React.lazy(() => import("Containers/Login/Login"));
const Home = React.lazy(() => import("Containers/Home/Home"));

export default () => {
  const { isAuthenticated, isAuthenticating } = React.useContext(storeContext);
  return (
    <Switch>
      {isAuthenticating && <Route render={() => <div>....loading</div>} />}
      <UnauthenticatedRoute
        isAuthenticated={isAuthenticated}
        path="/login"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Login />
          </Suspense>
        )}
      />
      <AuthenticatedRoute
        isAuthenticated={isAuthenticated}
        path="/"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Home />
          </Suspense>
        )}
      />
    </Switch>
  );
};
