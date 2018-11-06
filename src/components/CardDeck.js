import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import PlayerCard from "./PlayerCard";


const SortableItem = SortableElement(({ value }) =>
  <PlayerCard whale={value} />
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {/* {items.map((value, index) =>
        <SortableItem key={`item-${value}`} index={index} value={value} />
      )} */}
    </div>
  );
});

class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }, e) {
    const { whaleOrder, setWhaleOrder } = this.props;
    const newOrder = arrayMove(whaleOrder, oldIndex, newIndex);
    setWhaleOrder(newOrder);
    this.props.socket('whaleOrder', newOrder);
  }

  render() {
    return (
      <SortableList
        useDragHandle
        items={this.props.whaleOrder}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

export default CardDeck;
