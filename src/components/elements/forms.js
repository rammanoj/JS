import React from "react";
import Button from "./button";
import "./../style/element_styles.css";

class Input extends React.Component {
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
          onFocus={this.props.focus}
          onBlur={this.props.blur}
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
            change={this.props.handle[i]}
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
            change={this.props.handle[i]}
            value={this.props.value[i]}
            validators={this.props.validators[i].errors[0]}
            helpText={this.props.helpText[i]}
            focus={this.props.focus}
            blur={this.props.blur}
          />
        );
      }
    }
    return <ul>{inputs}</ul>;
  }

  render() {
    let inputs = this.addInput();
    const forms = (
      <form
        action={this.props.action}
        method={this.props.method}
        className="formStyle"
      >
        <h1>{this.props.header}</h1>
        {inputs}
        <li>
          <Button
            class="buttonStyle1"
            type={this.props.button_type}
            name={this.props.button_name}
            click={this.props.button_click}
          />
        </li>
      </form>
    );
    return forms;
  }
}

export default Form;
export { Input };
