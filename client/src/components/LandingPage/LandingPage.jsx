import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LandingPage = (props) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tryAgain, setTryAgain] = useState(false);
  const handleChangeInput = (event) => {
    if (event.target.name === "username") {
      let newUsername = event.target.value;
      setUsername(newUsername);
    }
    if (event.target.name === "password") {
      let newUsername = event.target.value;
      setPassword(newUsername);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3051/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",

      body: JSON.stringify({ username: username, password: password }),
    }).then((data) => {
        if(data) {
          props.handleLogin(event);
          history.push("/profile");
          }

      })
      .catch((err) => {
        setTryAgain(true);
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <input
          value={username}
          name="username"
          onChange={handleChangeInput}
          placeholder={"insert name"}
        />
        <input
          value={password}
          name="password"
          onChange={handleChangeInput}
          type="password"
          placeholder={"password"}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
      {tryAgain && <div>That combination does not exit. Try again</div>}
    </div>
  );
};

export default LandingPage;
