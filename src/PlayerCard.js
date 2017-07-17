import React, { Component } from 'react';

import { Button, Grid, Header, Divider, Segment, Dropdown, Card, Label, Icon, Checkbox, Container } from 'semantic-ui-react';
import { SortableHandle } from 'react-sortable-hoc';

import './App.css';

import pilotOptions from './pilotOptions';


const DragHandle = SortableHandle(() => <span>::</span>);

class PlayerCard extends Component {
  render() {
    return (
      <Segment>
        <DragHandle />
        {this.props.value}
      </Segment>
    )
  }
}

export default PlayerCard;