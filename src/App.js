import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import storeContext from "./context";
import Routes from "./Routes";

class App extends Component {
  render() {
    const store = {
      isAuthenticated: false
    };
    return (
      <storeContext.Provider value={store}>
        <Routes isAuthenticated={store.isAuthenticated} />
      </storeContext.Provider>
    );
  }
}

export default withRouter(App);
