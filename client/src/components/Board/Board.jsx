import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Board = ({ socket, roomName }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // true
      socket.emit("joinRoom", roomName);
      socket.on("test log", (msg) => console.log(msg));
    });

    return () => {};
  }, []);

  return <div>This is board</div>;
};

export default Board;
