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

import "./App.css";
import "./reactToggle.css";

class App extends Component {
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
        />
        <Divider hidden clearing />

        <Segment>
          <Header as="h3">Commands</Header>
          <Grid verticalAlign="middle" columns="equal">
            <Grid.Column width={4}>
              <Header as="h5">New Heat</Header>
              <Button className="blue" size="medium" icon="refresh" circular />
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
            <Button color="pink">Galactagasm</Button>
            <Button color="orange">
              <Icon name="lightning" /> Tranzonic <Icon name="lightning" />
            </Button>
            <Button color="yellow">Fleet Attack</Button>
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

export default connect(mapStateToProps)(App);
