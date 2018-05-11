import React, { Component } from "react";

import "./App.css";
import Cell from "./Cell";

const defaultState = {
  grid: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ],
  currentPlayer: "red",
  showResult: false,
  isActive: true
};

class App extends Component {
  state = defaultState;

  changePlayer = () => {
    this.setState({
      currentPlayer: this.state.currentPlayer === "red" ? "blue" : "red"
    });
  };

  seletGridCell = columnIndex => {
    if(!this.state.isActive){
      return 
    }

    let grid = this.state.grid.slice();
    let column = grid[columnIndex];
    let currentCellIndex = -1;

    column.forEach((p, i) => {
      if (p === 0) {
        currentCellIndex = i;
      }
    });

    if (currentCellIndex >= 0) {
      grid[columnIndex][currentCellIndex] = this.state.currentPlayer;

      this.setState(
        {
          grid: grid
        },
        () => {
          if (
            this.isThereAnyWinner({ columnIndex, rowIndex: currentCellIndex })
          ) {
            this.setState({
              showResult: true,
              isActive: false
            });
          } else {
            this.changePlayer();
          }
        }
      );
    }
  };

  isThereAnyWinner = ({ columnIndex, rowIndex }) => {
    if (
      this.checkIsThereHorizontalMatch({ rowIndex }) ||
      this.checkIsVerticalMatch({ columnIndex })
    ) {
      return true;
    }

    return false;
  };

  checkIsThereHorizontalMatch = ({ rowIndex }) => {
    let found = 0;

    this.state.grid.forEach((gridItem, index) => {
      if (gridItem[rowIndex] === this.state.currentPlayer) {
        found++;
      } else {
        if (found !== 4) found = 0;
      }
    });

    return found >= 4;
  };

  checkIsVerticalMatch = ({ columnIndex }) => {
    let found = 0;
    const columnGrid = this.state.grid[columnIndex];
    columnGrid.map(columnItem => {
      if (columnItem === this.state.currentPlayer) {
        found++;
      } else {
        if (found !== 4) found = 0;
      }
    });

    return found >= 4;
  };

  resetGrid = () => {
    this.setState({
      grid: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      currentPlayer: "red",
      showResult: false,
      isActive: true
    });
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
    return (
      <div className="App">
        <div>{cells} </div>
        {this.state.showResult ? (
          <div className="winner-result">
            WINNNER is {this.state.currentPlayer}
            <button onClick={this.resetGrid}>Reset Button</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;