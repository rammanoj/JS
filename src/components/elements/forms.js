import React from "react";
import Button from "./button";
import styles from "./../style/sample.css";

class Input extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}:</label>
        <input
          className={styles.in1 + " " + styles.in}
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.name}
          onChange={this.props.change}
          value={this.props.value || ""}
        />
        <div>{this.props.validators}</div>
      </div>
    );
  }
}

class CheckBox extends React.Component {
  render() {
    return (
      <div>
        <input
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.change}
          checked={this.props.value}
        />
        <label htmlFor={this.props.name}>{this.props.label}</label>
      </div>
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
          />
        );
      }
    }
    return inputs;
  }

  render() {
    let inputs = this.addInput();
    const forms = (
      <form action={this.props.action} method={this.props.method}>
        {inputs}
        <Button
          type={this.props.button_type}
          name={this.props.button_name}
          click={this.props.button_click}
        />
      </form>
    );
    return forms;
  }
}

export default Form;
export { Input };
