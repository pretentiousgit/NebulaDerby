import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

const socket = io();

class Game extends Component {
  render() {
    return (
      <div>
        "Hello world"
      </div>
    )
  }
}