import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

const socket = io();

const Game = ({ }) => {
  return (
    <div>
      "Hello world"
    </div>
  )
}

export default Game;