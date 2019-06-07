import React from "react";
import * as userApi from "./api/userApi";

class Login extends React.Component {
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
    return (
      <form onSubmit={this.handleLogin}>
        <div>
          <label>Email</label>
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
