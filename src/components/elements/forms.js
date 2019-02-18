import React from "react";
import Button from "./button";
import "./../style/element_styles.css";
import { Link } from "react-router-dom";

class Input extends React.Component {
  Handlefocus = e => {
    let name = e.target.name;
    document.getElementById(name).parentElement.style.boxShadow =
      "8px 1px 3px 3px #888888";
  };

  HandleBlur = e => {
    let name = e.target.name;
    document.getElementById(name).parentElement.style.boxShadow = "";
  };

  render() {
    return (
      <li>
        <label className="inputLabel" htmlFor={this.props.name}>
          {this.props.label}:
        </label>
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.name}
          onChange={this.props.change}
          onFocus={this.Handlefocus}
          onBlur={this.HandleBlur}
          value={this.props.value || ""}
        />
        <span>{this.props.validators}</span>
      </li>
    );
  }
}

class CheckBox extends React.Component {
  render() {
    return (
      <li className="checkbox">
        <input
          type={this.props.type}
          name={this.props.name}
          id={this.props.name}
          onChange={this.props.change}
          checked={this.props.value}
        />
        <label htmlFor={this.props.name}>{this.props.label}</label>
      </li>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  addInput() {
    let inputs = [];
    for (let i = 0; i < this.props.label.length; i++) {
      if (this.props.type[i] === "checkbox") {
        inputs.push(
          <CheckBox
            label={this.props.label[i]}
            name={this.props.name[i]}
            type={this.props.type[i]}
            key={i}
            change={this.props.handle}
            value={this.props.value[i]}
          />
        );
      } else {
        inputs.push(
          <Input
            label={this.props.label[i]}
            name={this.props.name[i]}
            type={this.props.type[i]}
            placeholder={this.props.placeholder[i]}
            key={i}
            change={this.props.handle}
            value={this.props.value[i]}
            validators={this.props.validators[i].errors[0]}
          />
        );
      }
    }
    return <ul>{inputs}</ul>;
  }

  render() {
    let link = "";
    if (this.props.header === "Login Here..") {
      link = (
        <Link to="/forgot-password" style={{ paddingRight: "10px" }}>
          Forgot Password ??
        </Link>
      );
    }
    let inputs = this.addInput();
    let var1 = (
      <div>
        <h5 style={{ color: "red" }}>{this.props.error}</h5>
        <br />
      </div>
    );
    const forms = (
      <form className="formStyle">
        <h1>{this.props.header}</h1>
        {this.props.error === "" ? "" : var1}
        {inputs}
        <li className="form_button">
          {link}
          <Button
            class="btn btn-primary"
            type={this.props.button_type}
            name={this.props.button_name}
            click={this.props.button_click}
            disabled={this.props.disable}
          />
        </li>
      </form>
    );
    return forms;
  }
}

export default Form;
export { Input };
