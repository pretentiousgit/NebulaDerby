import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Button,
  Grid,
  Header,
  Divider,
  Segment,
  Icon
} from "semantic-ui-react";

import SortableComponent from "./CardDeck";
import Toggle from "react-toggle";

import io from "socket.io-client";

import "./App.css";
import "./reactToggle.css";

import { newHeat } from "./redux/actions/app";

const socket = io();

class App extends Component {
  componentDidMount() {
    socket.emit("enterRoom", { user: "adminDevice" });
    socket.on("currentUserList", users => {
      // this.props.setConnectedUsers(users);
      console.log("setConnectedUsers", users);
    });
  }

  setBeacon() { }

  sendEvent(eventName) {
    socket.emit("adminEvent", { event: eventName });
  }

  render() {
    return (
      <Segment>
        <Header floated="left" as="h2">
          Nebula Space Derby
        </Header>
        <Button
          className="green"
          size="massive"
          circular
          icon="flag"
          floated="right"
          onClick={() => this.sendEvent("startRace")}
        />
        <Divider hidden clearing />

        <Segment>
          <Header as="h3">Commands</Header>
          <Grid verticalAlign="middle" columns="equal">
            <Grid.Column width={4}>
              <Header as="h5">New Heat</Header>
              <Button
                className="blue"
                size="medium"
                icon="refresh"
                circular
                onClick={this.props.newHeat}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h5">Fake Heat</Header>
              <Toggle className="fake-heat-toggle" />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h5">Beacon</Header>
              <Button toggle circular color="red" inverted />
              <Button toggle circular color="blue" inverted />
              <Button toggle circular color="green" inverted />
            </Grid.Column>
          </Grid>
          <Divider clearing />
          <Header as="h3">Events</Header>
          <Button.Group>
            <Button onClick={() => this.sendEvent("Galactagasm")} color="pink">
              Galactagasm
            </Button>
            <Button
              onClick={() => this.sendEvent("TranzonicInterference")}
              color="orange"
            >
              <Icon name="lightning" /> Tranzonic <Icon name="lightning" />
            </Button>
            <Button
              onClick={() => this.sendEvent("FleetAttack")}
              color="yellow"
            >
              Fleet Attack
            </Button>
          </Button.Group>
        </Segment>
        <Header floated="left">Whales</Header>
        <Divider clearing />
        <SortableComponent />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    pilots: state.pilots
  };
}

const mapDispatchToProps = dispatch => {
  return {
    newHeat: () => dispatch(newHeat())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
