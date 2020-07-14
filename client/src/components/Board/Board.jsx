import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";


const Board = () => {
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
  setSocket(io('http://localhost:3052'))    
/*   setNewGame(true)
 */    }
    console.log(data);
  });  ;

  return () => {
  };
}, [])

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
        setNewGame(true)
      }
      console.log(data);
    });
  };

  return (
    <>
      {!newGame && <div>
        <form>
          <label for="gameNameInput">New room</label>
          <input
            name="gameNameInput"
            value={gameNameInput}
            onChange={handleChangeInput}
          />
          <button onClick={createNewRoom}>Create</button>
        </form>
        <div>or</div>
        <form>
          <label for="findGameInput">Find already created room</label>
          <input
            name="findGameInput"
            value={findGameInput}
            onChange={handleChangeInput}
          />
          <button>Find</button>
        </form>
      </div>}
      {newGame && 
      <div>
          <div>New game created</div>
        </div>}
    </>
  );
};

export default Board;
