import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Board = ({socket}) => {
  const [roomName, setRoomName] = useState(null);
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected); // true
      socket.emit("joinRoom", 'room-1');

    });

    return () => {};
  }, []);

  return <div>This is board</div>;
};

export default Board;
