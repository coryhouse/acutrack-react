import React from "react";
import * as userApi from "./api/userApi";
import i18n from "./i18n";
import LanguageContext from "./LanguageContext";

class Login extends React.Component {
  static contextType = LanguageContext;

  state = {
    email: "",
    password: ""
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

  render() {
    const language = this.context;
    return (
      <form onSubmit={this.handleLogin}>
        <div>
          <label>{i18n[language].emailLabel}</label>
          <br />
          <input
            type="email"
            onChange={event => this.setState({ email: event.target.value })}
            value={this.state.email}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            onChange={event => this.setState({ password: event.target.value })}
            value={this.state.password}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
