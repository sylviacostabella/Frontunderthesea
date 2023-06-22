import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { getLoggedInUser, registerUser } from "./accountApi";

import "./registerlogin.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [registerError, setRegisterError] = useState("");


  const { setToken, setIsLoggedIn, isLoggedIn, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/account")
  }, [isLoggedIn, navigate]);

  const createAccount = async (event) => {
    event.preventDefault();

    try {
      // This register method does not return response the way documented
      const response = await registerUser(username, password);
      if (!response.error) {
        const { token, user } = response;
        // const user = await getLoggedInUser(token);
        setToken(token);
        setIsLoggedIn(true);
        setCurrentUser(user.username);
        navigate("/account");
      }

      if (response.error) {
        setRegisterError(response.error || response.message);
        setShowCredentialsError(true);
      }
    } catch {
      setRegisterError("Error registering, please try again!");
      setShowCredentialsError(true);
    }
  }

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  return <>
    <h1 className="pageName">REGISTER</h1>
    <form onSubmit={createAccount} className="registerLoginForm">
      <input
        type="text"
        value={username}
        style={{ marginBottom: "1em" }}
        id="username"
        placeholder="username"
        minLength="8"
        onChange={handleUsernameChange}
        required
      />
      <input
        type="password"
        value={password}
        style={{ marginBottom: "1em" }}
        id="password"
        placeholder="password"
        minLength="8"
        onChange={handlePasswordChange}
        required
      />
      <input
        type="password"
        value={confirmPassword}
        id="confirm_password"
        name="confirm_password"
        placeholder="confirm password"
        onChange={handleConfirmPasswordChange}
        required
      />
      {password !== confirmPassword && <div>Passwords do not match</div>}
      {showCredentialsError ? <div className="error">{registerError}</div> : null}
      <button style={{ marginTop: "1em" }} type="submit">Create Account</button>
    </form>

    <div className="registerLink">
      <Link to="/login">Already have an account? <br /> Login!</Link>
    </div>
  </>
}

export default Register;