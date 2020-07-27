import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Loby = (props) => {
  let history = useHistory();
  const [socket, setSocket] = useState(null);
  const [newGame, setNewGame] = useState(false);
  const [gameNameInput, setGameNameInput] = useState("");
  const [findGameInput, setFindGameInput] = useState("");

  const handleChangeInput = (event) => {
    if (event.target.name === "gameNameInput") {
      let newGameName = event.target.value;
      setGameNameInput(newGameName);
    }
    if (event.target.name === "findGameInput") {
      let newFindGame = event.target.value;
      setFindGameInput(newFindGame);
    }
  };

  useEffect(() => {
    if (socket) {
      props.getSocket(socket);
    }
    return () => {};
  }, [socket]);

  const createNewRoom = (event) => {
    event.preventDefault();
    fetch("http://localhost:3051/create", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",

      body: JSON.stringify({
        gameName: gameNameInput,
      }),
    }).then((data) => {
      if (data.status === 405) {
        alert("That username already exists. Please choose another one");
      }
      if (data.status === 200) {
        console.log("game created with success");
        fetch("http://localhost:3051/join", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",

          body: JSON.stringify({
            gameName: gameNameInput,
          }),
        }).then((data) => {
          if (data.status === 405) {
            alert("That username already exists. Please choose another one");
          }
          if (data.status === 200) {
            setSocket(io.connect("http://localhost:3052"));
            history.push("/board");
          }
          console.log(data);
        });
      }
      console.log(data);
    });
  };

  const joinCreatedRoom = (event) => {
    event.preventDefault();
    fetch("http://localhost:3051/join", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",

      body: JSON.stringify({
        gameName: findGameInput,
      }),
    }).then((data) => {
      if (data.status === 404) {
        alert("No game found");
      }
      if (data.status === 200) {
        props.getRoomName(findGameInput);
        setSocket(io.connect("http://localhost:3052"));
        history.push("/board");
      }
    });
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="gameNameInput">New room</label>
          <input
            name="gameNameInput"
            value={gameNameInput}
            onChange={handleChangeInput}
          />
          <button onClick={createNewRoom}>Create</button>
        </form>
        <div>or</div>
        <form>
          <label htmlFor="findGameInput">Find already created room</label>
          <input
            name="findGameInput"
            value={findGameInput}
            onChange={handleChangeInput}
          />
          <button onClick={joinCreatedRoom}>Find</button>
        </form>
      </div>
    </>
  );
};

export default Loby;
