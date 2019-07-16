import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import UnauthenticatedRoute from "Components/Auth/UnauthenticatedRoute";
import AuthenticatedRoute from "Components/Auth/AuthenticatedRoute";

// lazy loaded routes
const Login = React.lazy(() => import("Containers/Login/Login"));
const Home = React.lazy(() => import("Containers/Home/Home"));

export default ({ isAuthenticated }) => {
  return (
    <Switch>
      {isAuthenticated && <Route render={() => <div>....loading</div>} />}
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
        component={() => <Home />}
      />
    </Switch>
  );
};
