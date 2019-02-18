import React from "react";
import { getCookie } from "./elements/cookie";
import { Redirect } from "react-router-dom";
import { NavBar } from "./elements/navbar";
import { Loading } from "./elements/button";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: getCookie("Authorization") ? true : false,
      loading: true,
      childrenLength: 1,
      childrenLoaded: 0
    };
  }

  onChildLoad = () => {
    this.setState({ childrenLoaded: this.state.childrenLoaded + 1 }, () => {
      if (this.state.childrenLoaded === this.state.childrenLength) {
        this.setState({ loading: false });
        document.getElementsByClassName("home")[0].classList.remove("hide");
      }
    });
  };

  render() {
    document.body.style = "background: #fafafa;";
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.state.loading ? <Loading /> : ""}
          <div className="hide home">
            <NavBar onload={this.onChildLoad} />
            Welcome Home, user
          </div>
        </div>
      );
    } else {
      // User not logged, error
      return <Redirect to="/login" />;
    }
  }
}

export { Home };
