import React from "react";
import { getCookie } from "./elements/cookie";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: getCookie("Authorization") ? true : false
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return <div>Welcome Home, user</div>;
    } else {
      // User not logged, error
      return <div>You are not loggedIn ,please login and try</div>;
    }
  }
}

export { Home };
