import React from "react";
import * as userApi from "./api/userApi";
import i18n from "./i18n";
import LanguageContext from "./LanguageContext";
import TextInput from "./TextInput";

class Login extends React.Component {
  static contextType = LanguageContext;

  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  };

  handleLogin = event => {
    event.preventDefault();
    userApi
      .login(this.state.email, this.state.password)
      .then(user => {
        alert("valid");
      })
      .catch(error => {
        alert("Invalid credentials.");
      });
  };

  handleBlur = event => {
    const { name } = event.target;
    this.setState({
      [name + "Error"]: this.state[name] === "" ? `${name} is required.` : ""
    });
  };

  // The form is valid if both fields are populated.
  formIsValid() {
    return this.state.email && this.state.password;
  }

  render() {
    const language = this.context;
    return (
      <form onSubmit={this.handleLogin}>
        <TextInput
          id="email"
          label={i18n[language].emailLabel}
          type="email"
          name="email"
          required
          onBlur={this.handleBlur}
          onChange={event => this.setState({ email: event.target.value })}
          value={this.state.email}
          error={this.state.emailError}
        />

        <TextInput
          id="password"
          label="Password"
          type="password"
          name="password"
          required
          onBlur={this.handleBlur}
          onChange={event => this.setState({ password: event.target.value })}
          value={this.state.password}
          error={this.state.passwordError}
        />

        <input type="submit" disabled={!this.formIsValid()} value="Login" />
      </form>
    );
  }
}

export default Login;
