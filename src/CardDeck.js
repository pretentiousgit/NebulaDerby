import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import PlayerCard from './PlayerCard';

import pilotOptions from './pilotOptions';

const SortableItem = SortableElement(({value}) =>
  <PlayerCard whale={value} />
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class CardDeck extends Component {
  state = {
    items: ['Love', 'Cyber', 'Imperial', 'Savage'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList useDragHandle items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default CardDeck;