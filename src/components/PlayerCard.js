import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Item, Grid, Segment, Dropdown, Icon } from "semantic-ui-react";
import { SortableHandle } from "react-sortable-hoc";
import Toggle from "react-toggle";

import "../static/reactToggle.css";
import "../App.css";

const DragHandle = SortableHandle(() =>
  <Icon name="content" size="large" color="grey" />
);

const LoveWhaleState = whaleState => {
  switch (whaleState) {
    case "1":
      return <Icon name="empty heart" color="purple" />;
    case "2":
      return <Icon name="empty heart" color="pink" />;
    default:
      return <Icon name="empty heart" color="red" />;
  }
};

// this has to receive the list of connected users from the room
// and then let us know which of the whale users is connected on load
// we should receive that information on connection

class PlayerCard extends Component {
  handleChange(e, data) {
    const { value, options } = data;
    this.props.updatePilots(value, options);
  }

  state = {}

  setPredatorMode(e) {
    this.setState({ predatorMode: !this.state.predatorMode });
    //todo: pass in socket from above?
  };

  render() {
    const LoveHandle = this.props.whale.toLowerCase() === "love"
      ? <div>
        <Button icon="empty heart" circular basic color="purple" />
        <Button icon="empty heart" circular basic color="pink" />
        <Button icon="empty heart" circular basic color="red" />
      </div>
      : "";


    const PredatorMode =
      this.props.whale.toLowerCase() === "predator"
        ?
        <Button
          id="predator"
          toggle
          color='red'
          circular
          icon="hand lizard"
          label="predator mode"
          floated="right"
          size="large"
          basic={Boolean(!this.state.predatorMode)}
          onClick={() => this.setPredatorMode()}
        />
        : "";

    return (
      <Segment>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={1}>
              <DragHandle />
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Header as="h5">
                  {this.props.whale}
                </Item.Header>
              </Item>
            </Grid.Column>
            <Grid.Column width={11} textAlign="right">
              {LoveHandle} {PredatorMode}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

PlayerCard.propTypes = {
  whale: PropTypes.string
};

export default PlayerCard;
