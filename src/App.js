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

  state = {

  }

  setBeacon(color) {
    switch(color){
      case "red":
        this.setState({
          beaconBlue: false,
          beaconRed: true,
          beaconGreen: false
        });
        break;
      case "blue":
        this.setState({
          beaconBlue: true,
          beaconRed: false,
          beaconGreen: false
        });
        break;
      case "green":
        this.setState({
          beaconBlue: false,
          beaconRed: false,
          beaconGreen: true
        });
        break;
      default:
        this.setState({
          beaconBlue: false,
          beaconRed: false,
          beaconGreen: false
        });
        break;
    }
  }

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
            <Header as="h5">Heat Controls</Header>
              <Button
                className="blue"
                size="medium"
                onClick={() => {
                  this.sendEvent("newHeat", this.props);
                }}
              >
              <Icon name="refresh" />
              New Heat
              </Button>
              <Button
                className="red"
                size="medium"
                toggle
                basic
                onClick={() => {
                  this.sendEvent("newHeat", this.props);
                }}
              >
              Fake Heat
              <Icon name="right arrow" />
              </Button>
            </Segment>
            <Segment>
              <Header as="h5">Events</Header>
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
        </Segment>
        <Segment>
          <Header as="h5">Beacons</Header>
          <Button
            onClick={() => (this.state.beaconGreen) ? this.setBeacon() : this.setBeacon("green")}
            color="green"
            basic={Boolean(!this.state.beaconGreen)}
          >
            <Icon name="flask" />
            Boost Cyberwhale
          </Button>
          <Button
            onClick={() => (this.state.beaconBlue) ? this.setBeacon() : this.setBeacon("blue")}
            color="blue"
            basic={Boolean(!this.state.beaconBlue)}
          >
            <Icon name="diamond" /> Boost Imperium
          </Button>
          <Button
            onClick={() => (this.state.beaconRed) ? this.setBeacon() : this.setBeacon("red")}
            color="red"
            basic={Boolean(!this.state.beaconRed)}
          >
            <Icon name="bomb" />
            Boost Rikkenor
          </Button>
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
