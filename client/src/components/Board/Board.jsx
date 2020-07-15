import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Board = () => {
  const [roomName, setRoomName] = useState(null);
  useEffect(() => {
    return () => {};
  }, []);

  return <div>This is board</div>;
};

export default Board;
