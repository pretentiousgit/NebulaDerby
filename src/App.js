import React, { Component } from 'react';
import logo from './logo.svg';

import { Button, Grid, Header, Divider, Segment, Dropdown, Card, Label, Icon, Checkbox, Container } from 'semantic-ui-react';
import SortableComponent from './CardDeck';

import './App.css';

class App extends Component {
  render() {
    return (
      <Segment>
        <Header floated='left'>
          Nebula Space Derby
        </Header>
        <Button
          className='green'
          size='massive'
          circular
          icon='flag'
          floated='right'
        />
        <Divider hidden clearing />
        <Segment>
          <Header as='h5'>
            Commands
          </Header> 
          <Grid verticalAlign='middle'>
            <Grid.Column width={4}>
            <Button className='blue' size='large'>
              <Icon name='refresh'/>
              New Heat
            </Button>
            </Grid.Column>
            <Grid.Column width={3}>
            <Segment compact basic>
              <Header as='h5'>Fake Heat</Header>
              <Checkbox toggle className='fake-heat-toggle' floated='right'/>
            </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
            <Segment compact>
              <Header as='h4' divided>
                Beacon
              </Header>
              <Button toggle circular color='red' inverted />
              <Button toggle circular color='blue' inverted />
              <Button toggle circular color='green' inverted />
            </Segment>
            </Grid.Column>
          </Grid>
          <Divider clearing />
          <Header as='h5'>
            Events
          </Header>
          <Button.Group>
            <Button color='pink'>Galactagasm</Button>
            <Button color='orange'>Tranzonic Interference</Button>
            <Button color='yellow'>Fleet Attack</Button>
          </Button.Group>
        </Segment>
        <Header floated='left'>
          Whales
        </Header>
        <Divider clearing />
        <SortableComponent />
      </Segment>
    );
  }
}

export default App;
