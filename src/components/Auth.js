import React from "react";
import Form from "./elements/forms";
import { Link } from "./elements/button";
import { setCookie, getCookie } from "./elements/cookie";
import Validator, { updateValidators } from "./validators";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      basename: "http://127.0.0.1:8000/accounts/login/",
      user: "",
      password: "",
      remember: false,
      error_message: "",
      validators: Validator // Dynamically validate the form inputs.
    };
  }

  HandleUsername = e => {
    let user = e.target.value;
    let updated = updateValidators("user", user);
    let current_validator = this.state.validators;
    current_validator["user"] = updated;
    this.setState({
      user: user,
      validators: current_validator
    });
  };

  HandlePassword = e => {
    // "event(e)" is asynchronous, it's value might get updated by the time the state updates
    // refer: https://stackoverflow.com/questions/47442839/inputs-event-target-is-null-within-this-setstate-react-js
    let password = e.target.value;
    let updated = updateValidators("password", password);
    let current_validator = this.state.validators;
    current_validator["password"] = updated;
    this.setState({
      password: password,
      validators: current_validator
    });
  };

  HandleError = message => {
    this.setState({ error_message: message });
  };

  HandleRemember = e => {
    this.setState(prevstate => ({ remember: !prevstate.remember }));
  };

  HandleFormSubmit = e => {
    e.preventDefault();
    let rem = 0;
    if (this.state.remember) {
      rem = 1;
    }
    fetch(this.state.basename, {
      method: "POST",
      body: JSON.stringify({
        user: this.state.user,
        password: this.state.password,
        remember_me: rem
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(object => {
        this.HandleResponse(object);
      })
      .catch(error => {
        // can be triggered when serivce is unavialable, perform nothing
      });
  };

  Handlefocus = e => {
    let name = e.target.name;
    document.getElementById(name).parentElement.style.boxShadow =
      "8px 8px 8px 8px #888888";
  };

  HandleBlur = e => {
    let name = e.target.name;
    document.getElementById(name).parentElement.style.boxShadow = "";
  };

  HandleResponse = response => {
    console.log(getCookie("Authorization"));
    if (response.hasOwnProperty("error") && response.error === 0) {
      // successfully Authorized, set the cookies.
      let args = {
        length: 2,
        key: ["Authorization", "User"],
        value: [response.token, response.user_id]
      };
      args.age = this.state.remember ? 30 * 86400 : 86400;
      setCookie(args);
    } else {
      // error in Authorization, display the error.
      if (response.hasOwnProperty("error") && response["error"] === 1) {
        this.HandleError(response.message);
      } else {
        this.HandleError(
          Object.keys(response)[0] + ":" + response[Object.keys(response)[0]][0]
        );
      }
    }
  };

  HandleClearForm = e => {
    e.preventDefault();
    this.setState(prevstate => ({
      userData: {
        user: "",
        password: "",
        remember: false,
        error_message: ""
      }
    }));

    // Update the Validaators
    this.setState({ validators: Validator });
  };

  render() {
    return (
      <div>
        <div>{this.state.error_message}</div>
        <Form
          method="POST"
          header="Login"
          action={this.state.basename}
          type={["text", "password", "checkbox"]}
          name={["user", "password", "remember"]}
          placeholder={["Enter username", "Enter password"]}
          handle={[
            this.HandleUsername,
            this.HandlePassword,
            this.HandleRemember
          ]}
          focus={this.Handlefocus}
          blur={this.HandleBlur}
          label={["Username", "Password", "Remember me"]}
          helpText={["This field is required", "This field is required"]}
          button_type="submit"
          button_name="Login"
          button_click={this.HandleFormSubmit}
          value={[this.state.user, this.state.password, this.state.remember]}
          validators={[
            this.state.validators["user"],
            this.state.validators["password"]
          ]}
        />
        <Link name="Forgot Password?" uri="uri here" />
      </div>
    );
  }
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = { IsLoggedIn: false };
  }

  render() {
    return (
      <div>
        <Form
          label={["usernmae", "password", "Confirm Password", "email"]}
          type={["text", "password", "password", "email"]}
          name={["username", "password", "confirm_password", "email"]}
        />
        <button>Register</button>
      </div>
    );
  }
}

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Form
        action=""
        method=""
        label={["email"]}
        type={["email"]}
        name={["email"]}
        placeholder={["Enter email"]}
        helpText={["some help text"]}
        value={[]}
      />
    );
  }
}

export default Login;
export { Register, ForgotPassword };
