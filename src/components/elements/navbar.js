import React from "react";

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <nav class="">
        <UnorderList /> {/* elements to the left */}
        <UnorderList /> {/* elements to the right */}
      </nav>
    );
  }
}

class UnorderList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let list = [];
    for (let i = 0; i < this.props.list.length; i++) {
      list.push(<List name={this.props[i].name} class={this.props.class} />);
    }
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <li class={this.props.class}>{this.props.name}</li>;
  }
}
