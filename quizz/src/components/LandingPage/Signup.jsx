import React, { useState, useEffect, useRef } from "react";
import avatar from "../../images/51.png";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();
  const randomNumber = (x) => {
    let result = Math.floor(Math.random() * x);
    return result;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [greaterThan5, setGreaterThan5] = useState(false);
  let [avatarUrl, setAvatarUrl] = useState(avatar);
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
    if (password.length < 6 || username.length < 6) {
      setGreaterThan5(true);
      return;
    }
    if (avatarUrl === avatar) {
      avatarUrl = "https://api.adorable.io/avatars/face/51";
    }

    fetch("http://localhost:3051/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        avatarUrl: avatarUrl,
      }),
    }).then((data) => {
      if (data.status === 405) {
        alert("That username already exists. Please choose another one");
      }
      if (data.status === 200) {
        history.push("/");
      }
      console.log(data);
    });
  };
  const getNewAvatar = () => {
    setAvatarUrl(`https://api.adorable.io/avatars/face/${randomNumber(1000)}`);
  };

  return (
    <div>
      <h1>Welcome to Trivia Night</h1>
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
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
      <img className="Avatar" src={avatarUrl} alt="avatar" />
      <button onClick={getNewAvatar}>Get another avatar</button>
      <div>
        {greaterThan5 &&
          "Username and Password length must be greater than 5 characters"}
      </div>
    </div>
  );
};

export default Signup;
