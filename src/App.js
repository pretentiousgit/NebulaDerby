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

import { newHeat, toggleFakeHeat } from "./redux/actions/app";

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

  sendEvent(eventName, message) {
    socket.emit("adminEvent", { event: eventName, message: message });
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
          onClick={() => this.sendEvent("startRace", { fakeHeat: this.props.fakeHeat, whaleOrder: this.props.whaleOrder })}
        />
        <Divider hidden clearing />

        <Segment>
          <Grid verticalAlign="middle" columns="equal">
            <Grid.Column width={3}>
              <Header as="h5">New Heat</Header>
              <Button
                className="blue"
                size="medium"
                icon="refresh"
                circular
                onClick={() => {
                  this.sendEvent("newHeat", this.props)
                }}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h5">Fake Heat</Header>
              <Toggle
                className="fake-heat-toggle"
                checked={this.props.fakeHeat}
                onChange={e => {
                  this.props.toggleFakeHeat(!this.props.fakeHeat)
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h5">Events</Header>
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
            </Grid.Column>
          </Grid>
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
    pilots: state.app.pilots,
    whaleOrder: state.app.whaleOrder,
    fakeHeat: state.app.fakeHeat
  };
}

const mapDispatchToProps = dispatch => {
  return {
    newHeat: () => dispatch(newHeat()),
    toggleFakeHeat: (val) => dispatch(toggleFakeHeat(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
