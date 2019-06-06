import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // this is equivalent to the code above.
  // const emailState = useState("");
  // const email = useState[0];
  // const setEmail = useState[1];

  function handleLogin(event) {}

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
