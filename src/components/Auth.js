import React from "react";
import Form from "./elements/forms";
import { setCookie, getCookie, deleteCookie } from "./elements/cookie";
import Validator, { updateValidators } from "./validators";
import validator from "./validators";
import { NavBar } from "./elements/navbar";
import { Redirect } from "react-router-dom";
import { login, register, forgotPassword } from "./../api";

class Login extends React.Component {
  constructor() {
    super();
    console.log("rammanoj");
    console.log(getCookie("Authorization"));
    this.state = {
      IsLoggedIn: getCookie("Authorization") !== undefined,
      user: "",
      password: "",
      remember: false,
      error_message: "",
      disable: true,
      validators: Validator // Dynamically validate the form inputs.
    };
  }

  HandleAllFields = e => {
    // "event(e)" is asynchronous, it's value might get updated by the time the state updates
    // refer: https://stackoverflow.com/questions/47442839/inputs-event-target-is-null-within-this-setstate-react-js
    let { name, value } = e.target,
      current_validator = this.state.validators;
    if (name === "remember") {
      this.setState({ [name]: !this.state.remember });
    } else {
      let updated = updateValidators(name, value);
      if (
        updated.errors.length > 0 ||
        this.state.user === "" ||
        this.state.password === ""
      ) {
        this.setState({ disable: true });
      } else {
        this.setState({ disable: false });
      }
      current_validator[name] = updated;
      // In Javascript, when you create an object literal {} and
      //  you wrap the object’s key in array brackets [key] you can dynamically set that key.
      this.setState({
        validators: current_validator,
        [name]: value
      });
    }
  };

  HandleFormSubmit = e => {
    e.preventDefault();
    let rem = 0;
    if (this.state.remember) {
      rem = 1;
    }
    this.setState({ disable: true });
    fetch(login, {
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
      .then(response => response.json())
      .then(object => this.HandleResponse(object))
      .catch(error => {
        // can be triggered when serivce is unavialable, perform nothing
      });
  };

  HandleResponse = response => {
    this.setState({ disable: false });
    if (response.error === 0) {
      // successfully Authorized, set the cookies.
      let args = {},
        d = new Date();
      let age = this.state.remember ? 30 * 86400 : 86400;
      args = {
        length: 2,
        key: ["Authorization", "user", "UserId"],
        value: [
          { token: response.token, age: Date.now() + age },
          response.user,
          response.user_id
        ]
      };
      args.age = age;
      setCookie(args);
      this.setState({ IsLoggedIn: true });
    } else {
      // error in Authorization, display the error.
      this.setState({ error_message: response.message });
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
    document.body.style = "background: #fafafa;";
    if (this.state.IsLoggedIn) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div>
          <NavBar />
          <Form
            error={this.state.error_message}
            header="Login Here.."
            type={["text", "password", "checkbox"]}
            name={["user", "password", "remember"]}
            placeholder={["Enter username", "Enter password"]}
            handle={this.HandleAllFields}
            label={["Username", "Password", "Remember me"]}
            button_type="submit"
            button_name="Login"
            button_click={this.HandleFormSubmit}
            value={[this.state.user, this.state.password, this.state.remember]}
            validators={[
              this.state.validators["user"],
              this.state.validators["password"]
            ]}
            disable={this.state.disable}
          />
        </div>
      );
    }
  }
}

// Registration at the website

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      IsLoggedIn: false,
      username: "",
      password: "",
      email: "",
      mobile: "",
      confirm_password: "",
      error_message: "",
      validators: validator,
      disable: true
    };
  }

  HandleAllFields = e => {
    // "event(e)" is asynchronous, it's value might get updated by the time the state updates
    // refer: https://stackoverflow.com/questions/47442839/inputs-event-target-is-null-within-this-setstate-react-js
    let { name, value } = e.target,
      current_validator = this.state.validators;
    let updated = updateValidators(name, value);
    if (
      updated.errors.length > 0 ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirm_password === "" ||
      this.state.email === "" ||
      this.state.mobile === ""
    ) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
    current_validator[name] = updated;
    // In Javascript, when you create an object literal {} and
    //  you wrap the object’s key in array brackets [key] you can dynamically set that key.
    this.setState({
      validators: current_validator,
      [name]: value
    });
  };

  HandleFormSubmit = e => {
    e.preventDefault();
    fetch(register, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
        email: this.state.email,
        mobile: this.state.mobile
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

  HandleResponse = response => {
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
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      error_message: ""
    }));

    // Update the Validators
    this.setState({ validators: Validator });
  };

  render() {
    if (getCookie("Authorization") !== undefined) {
      return <div>You are already loggedIn!</div>;
    } else {
      let {
        username: u,
        password: p,
        email: e,
        mobile: m,
        confirm_password: c_p,
        validators: v
      } = this.state;
      return (
        <div>
          <NavBar />
          <Form
            error={this.state.error_message}
            disable={this.state.disable}
            header="Register Here.."
            type={["text", "password", "password", "email", "text"]}
            name={[
              "username",
              "password",
              "confirm_password",
              "email",
              "mobile"
            ]}
            placeholder={[
              "Enter Username",
              "Enter Password",
              "Confirm your Password",
              "Enter email",
              "Enter mobile number"
            ]}
            handle={this.HandleAllFields}
            label={[
              "Usernmae",
              "Password",
              "Confirm Password",
              "Email",
              "Mobile"
            ]}
            button_type="submit"
            button_name="Signup!"
            button_click={this.HandleFormSubmit}
            value={[u, p, c_p, e, m]}
            validators={[
              v["username"],
              v["password"],
              v["confirm_password"],
              v["email"],
              v["mobile"]
            ]}
          />
        </div>
      );
    }
  }
}

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      validators: validator,
      disable: true,
      error_message: ""
    };
  }

  HandleAllFields = e => {
    let { name, value } = e.target,
      current_validator = this.state.validators;
    let updated = updateValidators(name, value);
    if (updated.errors.length > 0 || this.state.email === "") {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
    current_validator[name] = updated;
    this.setState({
      validators: current_validator,
      [name]: value
    });
  };

  HandleFormSubmit = e => {
    e.preventDefault();
    fetch(forgotPassword, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email
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

  HandleResponse(obj) {
    this.setState({ error_message: obj.message });
    if (obj.error === 1) {
      // add CSS class with green text
    } else {
      // add css class with red text
    }
  }

  HandleClearForm = e => {
    e.preventDefault();
    this.setState({
      email: "",
      error_message: ""
    });

    // Update the Validators
    this.setState({ validators: Validator });
  };

  render() {
    document.body.style = "background: #fafafa;";
    if (getCookie("Authorization") !== undefined) {
      return <div>You are already loggedIn!</div>;
    } else {
      return (
        <div>
          <NavBar />
          <Form
            header="Forgot Password..?"
            label={["email"]}
            type={["email"]}
            name={["email"]}
            error={this.state.error_message}
            placeholder={["Enter email"]}
            handle={this.HandleAllFields}
            value={[this.state.email]}
            validators={[this.state.validators["email"]]}
            button_type="submit"
            button_name="Send"
            button_click={this.HandleFormSubmit}
            disable={this.state.disable}
          />
        </div>
      );
    }
  }
}

class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      IsLoggedIn: getCookie("Authorization") !== undefined
    };
  }

  render() {
    if (this.state.IsLoggedIn) {
      deleteCookie(["Authorization", "UserId", "user"]);
      return <Redirect to="/login" />;
    } else {
      return <Redirect to="/home" />;
    }
  }
}

export default Login;
export { Register, ForgotPassword, Logout };
