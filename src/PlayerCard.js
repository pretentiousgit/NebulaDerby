import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Item, Grid, Segment, Dropdown, Icon } from "semantic-ui-react";
import { SortableHandle } from "react-sortable-hoc";
import Toggle from "react-toggle";

import "./reactToggle.css";
import "./App.css";

import { updatePilots, togglePredatorMode } from "./redux/actions/app";

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

class PlayerCard extends Component {
  handleChange(e, data) {
    const { value, options } = data;
    this.props.updatePilots(value, options);
  }

  render() {
    const LoveHandle =
      this.props.whale.toLowerCase() === "love"
        ? LoveWhaleState(this.props.LoveWhaleState)
        : "";

    const PredatorMode =
      this.props.whale.toLowerCase() === "savage"
        ? <label htmlFor="predator">
            <span
              style={{
                position: "relative",
                top: "-7px",
                paddingRight: "5px"
              }}
            >
              Predator Mode
            </span>
            <Toggle
              id="predator"
              onChange={e =>
                this.props.sendPredatorMode(
                  this.props.whaleOrder,
                  e.target.checked
                )}
            />
          </label>
        : "";

    return (
      <Segment>
        <Grid relaxed>
          <Grid.Row stretched>
            <Grid.Column width={1} textAlign="center">
              <DragHandle />
            </Grid.Column>
            <Grid.Column width={12}>
              <Item>
                <Item.Header as="h5">
                  {this.props.whale} {LoveHandle}
                </Item.Header>
                <Item.Content>
                  {PredatorMode}
                  <Dropdown
                    placeholder="Select Pilot"
                    fluid
                    search
                    options={this.props.pilots}
                    selection
                    onChange={(e, data) => {
                      this.handleChange(e, data);
                    }}
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2} verticalAlign="bottom">
              <Grid.Row />
              <Grid.Row>
                {this.props.connected
                  ? <Button
                      circular
                      icon="signal"
                      color="green"
                      size="medium"
                      floated="right"
                    />
                  : <Button
                      circular
                      icon="signal"
                      color="red"
                      size="medium"
                      floated="right"
                    />}
              </Grid.Row>
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

function mapStateToProps(state) {
  return {
    pilots: state.app.pilots,
    whaleOrder: state.app.whaleOrder
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updatePilots: (pilot, pilots) => dispatch(updatePilots(pilot, pilots)),
    sendPredatorMode: (whaleOrder, bool) =>
      dispatch(togglePredatorMode(whaleOrder, bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
