import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import PlayerCard from "./PlayerCard";

import { connect } from "react-redux";
import { updateWhaleOrder } from "./redux/actions/app";

const SortableItem = SortableElement(({ value }) =>
  <PlayerCard whale={value} />
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) =>
        <SortableItem key={`item-${value}`} index={index} value={value} />
      )}
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
    setWhaleOrder(arrayMove(whaleOrder, oldIndex, newIndex));
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

function mapStateToProps(state) {
  return {
    whaleOrder: state.app.whaleOrder,
    predatorMode: state.app.predatorMode
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setWhaleOrder: whaleOrder => dispatch(updateWhaleOrder(whaleOrder))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDeck);
