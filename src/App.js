import React, { Component } from 'react';
import logo from './logo.svg';

import { Button, Grid, Header, Divider, Segment, Dropdown, Card, Label, Icon, Checkbox, Container } from 'semantic-ui-react';
import SortableComponent from './CardDeck';

import pilotOptions from './pilotOptions';
import './App.css';

class App extends Component {
  render() {
    return (
      <Segment>
        <Header floated='left'>
          Nebula Space Derby
        </Header>
        <Button className='green' size='huge' circular floated='right'>
          <Icon name='flag'/>
          START
        </Button>          
        <Divider horizontal clearing />
        <Segment>
          <Grid>
            <Grid.Column>
              <Grid.Row>
                <Button className='blue' size='large'>
                  <Icon name='refresh'/>
                  New Heat
                </Button>
              <Grid.Row>
              </Grid.Row>
                <Header as='h4'>
                  Fake Heat
                </Header>
                <Checkbox toggle className='fake-heat-toggle' />
              <Grid.Row>
              </Grid.Row>
                <Header as='h4' divided>
                  Beacon
                </Header>
                <Button toggle circular color='red' inverted />
                <Button toggle circular color='blue' inverted />
                <Button toggle circular color='green' inverted />
              </Grid.Row>
            </Grid.Column>
          </Grid>
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
