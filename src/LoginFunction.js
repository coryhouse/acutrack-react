import React, { useState } from "react";
import * as userApi from "./api/userApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    userApi
      .login(email, password)
      .then(user => {
        alert("valid");
      })
      .catch(error => {
        alert("Invalid credentials.");
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div>
        <label>Password</label>
        <br />
        <input
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
