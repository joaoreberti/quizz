import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Board = ({ socket, roomName }) => {
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    socket.on("connect", () => {
      setLoading(false);
      console.log(socket.connected); // true
      socket.emit("joinRoom", roomName);
      socket.on("test log", (msg) => console.log(msg));
      socket.emit("getPlayers", roomName)
    });

    return () => {};
  });

  return <>{!loading && <div>{roomName}</div>}</>;
};

export default Board;
