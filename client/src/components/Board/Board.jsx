import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./Board.css";

const Board = ({ socket, roomName, currentUser }) => {
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if(!socket){
     return  history.push("/")
    }
    socket.on("connect", () => {
      setLoading(false);
      console.log(socket.connected); // true
      socket.emit("joinRoom", roomName);
      socket.on("test log", (msg) => console.log(msg));
      socket.emit("getPlayers", roomName);
      socket.on("playerData", (data) => setPlayers(data));
    });

    return () => {};
  });

  return (
    <>
      {!loading && (
        <div className="grid-container">
          <div className="item1">
            {players &&
              players
                .filter((player) => {
                  return player.id !== currentUser;
                })
                .map((player) => (
                  <>
                    <div>
                      <img className="opponent-avatar" src={player.avatar_url}></img>
                      <div>{player.username}</div>
                    </div>
                  </>
                ))}
          </div>
          <div className="item2">Settings</div>
          <div className="item3">Main</div>
          <div className="item4">Chat</div>

          <div className="item6">
            {players &&
              players
                .filter((player) => {
                  return player.id === currentUser;
                })
                .map((player) => (
                  <>
                    <img className="user-avatar" src={player.avatar_url}></img>
                    <div>{player.username}</div>
                  </>
                ))}
          </div>
          <div className="item5">Possible answers</div>
        </div>
      )}
    </>
  );
};

export default Board;
