import React from "react";

function Login() {
  return (
    <form>
      <div>
        <label>Email</label>
        <br />
        <input type="text" />
      </div>
      <div>
        <label>Password</label>
        <br />
        <input type="password" />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
