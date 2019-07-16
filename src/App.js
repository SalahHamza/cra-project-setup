import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import storeContext from "./context";
import Routes from "./Routes";
import { authStorage } from "Utils";

class App extends Component {
  state = {
    token: null,
    isAuthenticating: false
  };

  onUserAuthentication = (token = null) => {
    this.setState({ token: token, isAuthenticating: false });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      authStorage.clear();
    } else {
      const tokenExpDate = new Date(localStorage.getItem("tokenExpDate"));
      // if token hasn't expired
      if (tokenExpDate > new Date()) {
        this.onUserAuthentication(token);
      } else {
        authStorage.clear();
      }
    }
  }

  render() {
    const store = {
      isAuthenticated: !!this.state.token,
      token: this.state.token,
      onUserAuthentication: this.onUserAuthentication,
      isAuthenticating: this.state.isAuthenticating
    };
    return (
      <storeContext.Provider value={store}>
        <Routes />
      </storeContext.Provider>
    );
  }
}

export default withRouter(App);
