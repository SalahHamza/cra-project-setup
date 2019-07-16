import React from "react";
import { Route, Redirect } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";

const unauthenticatedRoute = ({ component: C, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { redirect, ...searchParams } = qs.parse(props.location.search, {
          ignoreQueryPrefix: true
        });
        return !isAuthenticated ? (
          <C {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect === "" || redirect === null ? "/" : redirect,
              search: qs.stringify(searchParams, { addQueryPrefix: true })
            }}
          />
        );
      }}
    />
  );
};

unauthenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};

export default unauthenticatedRoute;
