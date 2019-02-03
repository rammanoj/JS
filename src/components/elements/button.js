import React from "react";

class Button extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <button type={this.props.type} onClick={this.props.click}>
        {this.props.name}
      </button>
    );
  }
}

class Link extends React.Component {
  render() {
    return <a href={this.props.uri}>{this.props.name}</a>;
  }
}

class Image extends React.Component {
  render() {
    return <img src={this.props.src} alt={this.props.alt} />;
  }
}

export { Link, Image };
export default Button;
