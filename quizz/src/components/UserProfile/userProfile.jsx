import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const UserProfile = (props) => {
  let history = useHistory()
  const [sessionsList, setSessionsList] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatar_url] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3051/profile", {
      method: "POST",
      credentials: "include",
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setUsername(data.username);
        setAvatar_url(data.avatar_url);
      });

    return () => {};
  }, []);


  const logout = (event) => {
    event.preventDefault();
    fetch("http://localhost:3051/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((data) => {
        if(data.status === 200){
          console.log('successfully')
          history.push('/')
        }
      });
  }

  return (
    <div>
      <h1>{username}</h1>
      <img src={avatar_url} alt="" />
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default UserProfile;
