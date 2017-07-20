import React, { Component } from 'react';
import logo from './logo.svg';

import { Button, Grid, Header, Divider, Segment, Dropdown, Card, Label, Icon, Checkbox, Container } from 'semantic-ui-react';
import SortableComponent from './CardDeck';
import Toggle from 'react-toggle';

import './App.css';
import './reactToggle.css';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

class App extends Component {
  componentDidMount() {
    fetch(`/users`, {
      accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((users) => {
      console.log(users)
    });
  }

  render() {
    return (
      <Segment>
        <Header floated='left' as='h2'>
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
          <Header as='h3'>
            Commands
          </Header> 
          <Grid verticalAlign='middle' columns='equal'>
            <Grid.Column width={4}>
              <Header as='h5'>
                New Heat
              </Header>
              <Button className='blue' size='medium' icon='refresh' circular/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h5'>Fake Heat</Header>
              <Toggle className='fake-heat-toggle'/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h5' divided>
                Beacon
              </Header>
              <Button toggle circular color='red' inverted />
              <Button toggle circular color='blue' inverted />
              <Button toggle circular color='green' inverted />
            </Grid.Column>
          </Grid>
          <Divider clearing />
          <Header as='h3'>
            Events
          </Header>
          <Button.Group>
            <Button color='pink'>Galactagasm</Button>
            <Button color='orange'><Icon name='lightning'/> Tranzonic <Icon name='lightning'/></Button>
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
