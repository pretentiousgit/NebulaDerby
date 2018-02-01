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

import Primus from './static/primus';
import CardDeck from "./components/CardDeck";
import Toggle from "react-toggle";

import "./App.css";
import "./static/reactToggle.css";

import { newHeat, toggleFakeHeat } from "./redux/actions/app";

// Primus connection options
const options = {
  pingTimeout: 10000,
  timeout: 10000,
  reconnect: {
    max: Infinity, // Number: The max delay before we try to reconnect.
    min: 500, // Number: The minimum delay before we try reconnect.
    retries: 10 // Number: How many times we should try to reconnect.
  },
  strategy: 'online, timeout, disconnect'
};

const primus = Primus.connect('http://localhost:3001', { options });

// Game admin application starts
class App extends Component {
  componentDidMount() {
    primus.on('open', () => {
      console.log('Connection is alive and kicking');
      primus.id((id) => {
        console.log(id);
        primus.write({ browserId: id });
      });
    });
  }

  setBeacon() { }

  sendEvent(eventName, message) {
    primus.write({ adminEvent: { event: eventName, message: message }});
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
                  this.sendEvent("newHeat", this.props);
                }}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h5">Fake Heat</Header>
              <Toggle
                className="fake-heat-toggle"
                checked={this.props.fakeHeat}
                onChange={e => {
                  this.props.toggleFakeHeat(!this.props.fakeHeat);
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h5">Events</Header>
              <Button.Group>
                <Button onClick={() => this.sendEvent("galactagasm")} color="pink">
                  Galactagasm
                </Button>
                <Button
                  onClick={() => this.sendEvent("tranzonicInterference")}
                  color="orange"
                >
                  <Icon name="lightning" /> Tranzonic <Icon name="lightning" />
                </Button>
                <Button
                  onClick={() => this.sendEvent("fleetAttack")}
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
        <CardDeck socket={this.sendEvent}/>
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
