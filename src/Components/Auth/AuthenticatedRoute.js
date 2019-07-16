import React from "react";
import { Route, Redirect } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";

const authenticatedRoute = ({ component: C, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const searchQuery = {
          redirect: props.location.pathname,
          ...qs.parse(props.location.search, { ignoreQueryPrefix: true })
        };
        return isAuthenticated ? (
          <C {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              search: qs.stringify(searchQuery, { addQueryPrefix: true })
            }}
          />
        );
      }}
    />
  );
};

authenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};

export default authenticatedRoute;
