import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import storeContext from "./context";

class App extends Component {
  render() {
    const store = {};
    return (
      <storeContext.Provider value={store}>
        <div>React App</div>
      </storeContext.Provider>
    );
  }
}

export default withRouter(App);
