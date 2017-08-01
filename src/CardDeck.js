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
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.setWhaleOrder(
      arrayMove(this.props.whaleOrder, oldIndex, newIndex)
    );
  };

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
    whaleOrder: state.app.whaleOrder
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setWhaleOrder: whaleOrder => dispatch(updateWhaleOrder(whaleOrder))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDeck);
