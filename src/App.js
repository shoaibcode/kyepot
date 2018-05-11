import React, { Component } from "react";

import "./App.css";
import Cell from "./Cell";

class App extends Component {
  state = {
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    currentPlayer: "red"
  };

  changePlayer = () => {
    this.setState({
      currentPlayer: this.state.currentPlayer === "red" ? "blue" : "red"
    });
  };

  seletGridCell = columnIndex => {
    let column = this.state.grid[columnIndex];
    let currentCellIndex = -1;

    column.forEach((p, i) => {
      if (p === 0) {
        currentCellIndex = i;
      }
    });

    if (currentCellIndex >= 0) {
      column[currentCellIndex] = this.state.currentPlayer;

      this.changePlayer();
    }
  };

  render() {
    let cells = this.state.grid.map((column, y) => {
      return (
        <div className="column" key={`column-${y}`}>
          {column.map((cell, x) => {
            return (
              <Cell
                key={`cell-${x}-${y}`}
                x={x}
                y={y}
                cell={cell}
                nextPlayer={"red"}
                seletGridCell={this.seletGridCell}
              />
            );
          })}
        </div>
      );
    });
    return <div className="App">{cells}</div>;
  }
}

export default App