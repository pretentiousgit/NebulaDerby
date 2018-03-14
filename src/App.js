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

  state = {}

  setFakeHeat(props) {
    this.setState({ fakeHeat: !this.state.fakeHeat});
    this.sendEvent("newHeat", props);
  }

  setBeacon(color) {
    switch(color){
      case "red":
        this.setState({
          beaconBlue: false,
          beaconRed: !this.state.beaconRed,
          beaconGreen: false
        });
        break;
      case "blue":
        this.setState({
          beaconBlue: !this.state.beaconBlue,
          beaconRed: false,
          beaconGreen: false
        });
        break;
      case "green":
        this.setState({
          beaconBlue: false,
          beaconRed: false,
          beaconGreen: !this.state.beaconGreen
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
                size="medium"
                style={{ marginBottom: '1em'}}
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
                basic={Boolean(!this.state.fakeHeat)}
                onClick={() => {
                  this.setFakeHeat(this.props);
                }}
              >
                Fake Heat
                <Icon name="right arrow" />
              </Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
              <Button
                className="green"
                circular
                size="massive"
                floated="right"
                onClick={() => this.sendEvent("startRace", { fakeHeat: this.props.fakeHeat, whaleOrder: this.props.whaleOrder })}
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
              style={{ marginBottom: '1em'}}
            >
              <Icon name="heartbeat" />
              Galactagasm
            </Button>
            <Button
              onClick={() => this.sendEvent("tranzonicInterference")}
              color="orange"
              size="big"
              style={{ marginBottom: '1em'}}
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
            style={{ marginBottom: '1em'}}
            basic={Boolean(!this.state.beaconGreen)}
          >
            <Icon name="flask" />
            Boost Cyberwhale
          </Button>
          <Button
            onClick={() => this.setBeacon("blue")}
            color="blue"
            size="big"
            style={{ marginBottom: '1em'}}
            basic={Boolean(!this.state.beaconBlue)}
          >
            <Icon name="diamond" />
            Boost Imperium
          </Button>
          <Button
            onClick={() => this.setBeacon("red")}
            color="red"
            size="big"
            basic={Boolean(!this.state.beaconRed)}
          >
            <Icon name="fighter jet" />
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
