import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { loginUser } from "./accountApi";

import "./registerlogin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { setToken, setIsLoggedIn, isLoggedIn, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/account")
  }, [isLoggedIn, navigate]);

  const submitAccountInfo = async (event) => {
    event.preventDefault();

    try {
      const { token, user } = await loginUser(username, password);
      setToken(token);
      setCurrentUser(user.username);
      setIsLoggedIn(true);
      navigate("/account");
    } catch {
      setLoginError("Error logging in, please try again!");
      setShowCredentialsError(true);
    }
  }

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return <>
    <div className="loginForm">
      <form onSubmit={submitAccountInfo} className="registerLoginForm">
        <h1 className="pageName">Login</h1>
        <input
          type="text"
          id="username"
          style={{ marginBottom: "1em" }}
          placeholder="username"
          minLength="8"
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          minLength="8"
          onChange={handlePasswordChange}
          required
        />
        {showCredentialsError ? <div className="error">{loginError}</div> : null}
        <button style={{ marginTop: "1em" }} type="submit">Login</button>

      </form>

      <div className="registerLink">
        <Link to="/register">Don't have an account? <br /> Sign up!</Link>
      </div>
    </div>
  </>
}

export default Login;