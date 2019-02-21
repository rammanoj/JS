import React from "react";
import { getCookie } from "./elements/cookie";
import { Redirect } from "react-router-dom";
import { NavBar } from "./elements/navbar";
import { Loading, Table, SearchComponent } from "./elements/button";
import { booking } from "./../api";

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

class Block extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: getCookie("Authorization") !== undefined,
      loading: true,
      childrenLength: 1,
      childrenLoaded: 0,
      parentLoad: true,
      response: ""
    };
  }

  onChildLoad = () => {
    this.setState({ childrenLoaded: this.state.childrenLoaded + 1 }, () => {
      if (this.state.childrenLoaded === this.state.childrenLength) {
        this.setState({ loading: false });
        document.getElementsByClassName("block")[0].classList.remove("hide");
      }
    });
  };

  trHandler(e) {
    // Here on clicking the td both tr and td are being triggered, hence depending on classname
    // to designate both of them.
    if (
      e.target.classList.length >= 0 &&
      e.target.classList[0] != "more-button"
    ) {
      alert("triggered tr");
    }
  }

  MoreHandler(e) {
    // alert("clicked on the more option");
    console.log(e.target);
  }

  async componentDidMount() {
    if (getCookie("Authorization") !== undefined) {
      let responseD = await fetch(booking, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + getCookie("Authorization").token
        }
      });
      let butonnCss = {
        background: "inherit",
        border: "none"
      };
      let data = await responseD.json(),
        elements = {};
      elements["name"] = [];
      elements["elements"] = [];
      elements["class"] = "table table-hover table-handle";
      elements["tr_b_class"] = "";
      elements["tr_h_class"] = "";
      elements["th_class"] = "";
      elements["td_class"] = "";
      elements["trHandler"] = this.trHandler;
      elements["name"] = ["Blocks", "More Options"];
      for (let i in data.results) {
        data.results[i].more = (
          <div className="dropdown">
            <button
              style={butonnCss}
              className="more-button"
              onClick={this.MoreHandler}
            >
              <span className="vertical-dots" />
            </button>
            <ul>
              <li>More</li>
              <li>Delete</li>
            </ul>
          </div>
        );
      }
      elements["elements"] = data.results;
      let table = <Table table={elements} />;
      this.setState({ response: table, parentLoad: true });
    }
  }

  render() {
    document.body.style = "background: #fafafa;";
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.state.loading && this.state.parentLoad ? <Loading /> : ""}
          <div className="hide block">
            <NavBar onload={this.onChildLoad} />
            <SearchComponent />
            {this.state.response}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export { Home, Block };
