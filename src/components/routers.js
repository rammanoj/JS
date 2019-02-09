import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./home";
import Login from "./Auth";

export const Routing = props => (
  <BrowserRouter>
    <div>
      <Route
        exact
        path="/"
        render={() => <div>Welcome here, you logged in successfully.</div>}
      />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="*" render={() => <div>Not found</div>} /> */}
    </div>
  </BrowserRouter>
);
