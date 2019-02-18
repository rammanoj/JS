import React from "react";
import loader from "./../../img/loader.gif";

class Button extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.class}
        onClick={this.props.click}
        disabled={this.props.disabled}
      >
        {this.props.name}
      </button>
    );
  }
}

class Image extends React.Component {
  render() {
    return (
      <img
        src={this.props.src}
        className={this.props.class}
        alt={this.props.alt}
      />
    );
  }
}

class Loading extends React.Component {
  render() {
    return <Image src={loader} class="loading" />;
  }
}

export { Image, Loading };
export default Button;
