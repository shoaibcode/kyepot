import React from "react";

class Cell extends React.Component {
  constructor() {
    super();
    this.seletGridCell = this.seletGridCell.bind(this);
  }

  seletGridCell() {
    this.props.seletGridCell(this.props.y);
  }

  render() {
    const { cell } = this.props;
    const cellSelected = cell ? `cell cell--${cell}` : "cell"
    return <section className={cellSelected} onClick={this.seletGridCell} />;
  }
}

export default Cell;