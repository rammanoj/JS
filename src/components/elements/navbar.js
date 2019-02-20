import React from "react";
import { getCookie } from "./cookie";
import { Link } from "react-router-dom";
import { navBar } from "./../../api";

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      nav: "",
      IsLoggedin: getCookie("Authorization") !== undefined
    };

    if (!this.state.IsLoggedin) {
      this.state.nav = (
        <div className="nav">
          <nav className="container">
            <UnorderedList
              link={["/home", "/login", "/signup"]}
              list={[<h1>Logo</h1>, "Login", "Signup"]}
              class="nav1"
              ListClass={["header", "navC", "navC"]}
            />
          </nav>
        </div>
      );
    }
  }

  async componentDidMount() {
    if (getCookie("Authorization") !== undefined) {
      let response = await fetch(navBar, {
        headers: {
          Authorization: "Token " + getCookie("Authorization").token,
          "Content-Type": "application/json"
        }
      });
      let data = await response.json();
      this.generateNav(data.message);
    }
  }

  generateNav(obj) {
    let topNav = [<h1>Logo</h1>],
      bottomNav = [],
      link_2 = [],
      bottomNavClass = [],
      topNavClass = [];
    topNav.push(obj.splice(obj.length - 1, 1)[0]);
    topNav.push(obj.splice(obj.length - 1, 1)[0]);
    bottomNav = obj;
    for (let i in topNav) {
      topNavClass.push("/" + topNav[i]);
    }
    for (let i in bottomNav) {
      bottomNavClass.push("navC2");
      link_2.push("/" + bottomNav[i]);
    }
    let updated_state = (
      <div className="nav">
        <nav className="container">
          <UnorderedList
            link={topNavClass}
            list={topNav}
            class="nav1"
            ListClass={["header", "navC", "navC"]}
          />
          <UnorderedList
            link={link_2}
            list={bottomNav}
            class="nav2"
            ListClass={bottomNavClass}
          />
        </nav>
      </div>
    );

    this.setState({ nav: updated_state });
    this.props.onload();
  }

  render = () => this.state.nav;
}

class UnorderedList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let list = [];
    for (let i = 0; i < this.props.list.length; i++) {
      let k = i,
        link = "";
      if (this.props.hasOwnProperty("id")) {
        k = this.props.id[i];
      }
      if (this.props.hasOwnProperty("link")) {
        link = this.props.link[i];
      }
      list.push(
        <List
          key={i}
          id={k}
          name={this.props.list[i]}
          link={link}
          class={this.props.ListClass[i]}
        />
      );
    }

    return <ul className={this.props.class}>{list}</ul>;
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.props.hasOwnProperty("link") && this.props.link !== undefined) {
      return (
        <li className={this.props.class} id={this.props.id}>
          <Link to={this.props.link}>{this.props.name}</Link>
        </li>
      );
    } else {
      return (
        <li className={this.props.class} id={this.props.id}>
          {this.props.name}
        </li>
      );
    }
  }
}

export { NavBar, UnorderedList };
