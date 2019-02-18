import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./home";
import Login, { Register, ForgotPassword, Logout } from "./Auth";
import { Loading } from "./elements/button";

export const Routing = props => (
  <BrowserRouter>
    <div>
      <Route
        exact
        path="/"
        render={() => <div>Welcome here, you logged in successfully.</div>}
      />
      <Route exact path="/" render={() => "this is one of the functions"} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/load" component={Loading} />

      {/* <Route exact path="*" render={() => <div>Not found</div>} /> */}
    </div>
  </BrowserRouter>
);

// three parameters while passing the parameters from the router to the component:
// {match, location, history} match.parameters consists of list of all params.

// These are the attributes required to create a Form:
// 1. header
// 2. type
// 3. Name
// 4. Placeholder
// 5. Handle
// 6. label
// 7. button_type
// 8. button_name
// 10. button_click
// 11. value
// 12. Validators
