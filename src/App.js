import React, { Component } from "react";

import {
  Button,
  Grid,
  Header,
  Divider,
  Segment,
  Icon
} from "semantic-ui-react";

import io from "./static/socket.io.slim.js";
import CardDeck from "./components/CardDeck";

import "./App.css";
import "./static/reactToggle.css";

// Socket.io business
const socket = io("http://localhost:3001", () => {
  console.log('Connected to server');
});


// Game admin application starts
class App extends Component {
  componentDidMount() {
    // Get server IP address
    socket.on('connect', () => {
      console.log("socket connected", socket.id);
      socket.emit('adminShake', { browserId: socket.id, message: 'admin browser' });
    });

    socket.on('whaleState', (d) => {
      console.log('whale update', d);
    });

    socket.on('raceEnd', (d) => {
      console.log('Race complete');
      this.setState({ raceInProgress: false });
    });

    socket.on('setBeacon', (d) => {
      this.setState(d);
    });
  }

  state = {
    blue: false,
    red: false,
    green: false,
    raceInProgress: false,
    predatorTarget: null,
    loveWhaleState: 1,
    whaleOrder: [
      'predator',
      'cyber',
      'imperial',
      'love'
    ]
  };

  setPredator(target) {
    socket.emit('predator', { target });
  }

  setBeacon(color) {
    socket.emit('beacon', { color, set: this.state[color] });
  }

  startRace(message) {
    console.log('emitted StartRace');
    this.setState({ raceInProgress: true });
    socket.emit('startRace');
  }

  resetRace(message) {
    console.log('resetRace');
    socket.emit('resetRace');
  }

  sendEvent(eventName, message) {
    socket.emit('adminEvent', { event: eventName, message: message });
  }

  render() {
    return (
      <Segment>
        <Header floated="left" as="h2">
          <Icon name="settings" />
          Mr Zeenok's Nebula Derby Control Panel
        </Header>
        <Divider hidden clearing />
        <Segment>
          <Grid>
            <Grid.Row columns={2} divided verticalAlign="middle">
              <Grid.Column>
                <Button
                  className="blue"
                  circular
                  size="massive"
                  floated="left"
                  disabled={this.state.raceInProgress}
                  basic={Boolean(this.state.raceInProgress)}
                  onClick={() =>
                    this.resetRace({
                      fakeHeat: this.state.fakeHeat,
                      whaleOrder: this.state.whaleOrder
                    })
                  }
                >
                  <Icon name="recycle" />
                  Reset
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="center">

                <Button
                  className="green"
                  circular
                  size="massive"
                  floated="right"
                  disabled={this.state.raceInProgress}
                  basic={Boolean(this.state.raceInProgress)}
                  onClick={() =>
                    this.startRace({
                      fakeHeat: this.state.fakeHeat,
                      whaleOrder: this.state.whaleOrder
                    })
                  }
                >
                  <Icon name="flag checkered" />
                  Start Race!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Button
            onClick={() => this.sendEvent("galactagasm")}
            size="big"
            color="pink"
            style={{ marginBottom: "1em" }}
          >
            <Icon name="heartbeat" />
            Galactagasm
          </Button>
          <Button
            onClick={() => this.sendEvent("tranzonicInterference")}
            color="orange"
            size="big"
            style={{ marginBottom: "1em" }}
          >
            <Icon name="lightning" />
            Tranzonic Interference
          </Button>
          <Button
            onClick={() => this.sendEvent("fleetAttack")}
            color="yellow"
            size="big"
          >
            <Icon name="bomb" />
            Fleet Attack
          </Button>
        </Segment>
        <Segment>
          <Button
            onClick={() => this.setBeacon("green")}
            color="green"
            size="big"
            style={{ marginBottom: "1em" }}
            basic={Boolean(!this.state.green)}
          >
            <Icon name="flask" />
            Boost Cyberwhale
          </Button>
          <Button
            onClick={() => this.setBeacon("blue")}
            color="blue"
            size="big"
            style={{ marginBottom: "1em" }}
            basic={Boolean(!this.state.blue)}
          >
            <Icon name="diamond" />
            Boost Imperium
          </Button>
          <Button
            onClick={() => this.setBeacon("red")}
            color="red"
            size="big"
            basic={Boolean(!this.state.red)}
          >
            <Icon name="fighter jet" />
            Boost Rikkenor
          </Button>
        </Segment>
        <Segment>
          <p>
            ** Killing a whale kills them for THE WHOLE GAME, they dead now!<br />
          </p>
          <Button
            onClick={() => this.setPredator("love")}
            color="red"
            size="big"
            style={{ marginBottom: "1em" }}
            basic={Boolean(!this.state.predator)}
          >
            <Icon name="bomb" />
            Predator - KILL CULT WHALE
          </Button><br />
          <Button
            onClick={() => this.setPredator("cyber")}
            color="red"
            size="big"
            style={{ marginBottom: "1em" }}
            basic={Boolean(!this.state.predator)}
          >
            <Icon name="bomb" />
            Predator - KILL VIRTUOUS SPHERE
          </Button><br />
          <Button
            onClick={() => this.setPredator("imperial")}
            color="red"
            size="big"
            style={{ marginBottom: "1em" }}
            basic={Boolean(!this.state.predator)}
          >
            <Icon name="bomb" />
            Predator - KILL IMPERIUM
          </Button>
        </Segment>
        <Header floated="left">Whales</Header>
        <Divider clearing />
        {/* <CardDeck socket={this.sendEvent} /> */}
      </Segment>
    );
  }
}

export default App;
