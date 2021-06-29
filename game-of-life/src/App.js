import React, {useState} from 'react';
import './App.css';

/*
  @params: int grid[][], int row, int col
  @result: number of alive cells
*/
function getCellsAlive(grid, row, col) {
  let result = 0;
  for (let i = (row > 0 ? -1 : 0); i < (row < grid.length - 1 ? 2 : 1); i++) {
    for (let j = (col > 0 ? -1 : 0); j < (col < grid[0].length - 1 ? 2 : 1); j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const x = row + i;
      const y = col + j;
      if (grid[x][y] === 1) {
        result += 1;
      }
    } 
  }
  return result;
}

function  BoardButton(props) {
  const name = props.tileClassName === "tile-on" ? "on" : "off";
  return (
    <div className={props.tileClassName} key={props.keyID} onClick={props.onClick}></div>
  )
}

function RunSimulation(props) {
  const name = props.toggle ? "Stop" : "Run"

  return (
    <div>
      <button className="simulate-button" onClick={props.onClick}>
        {name}
      </button>
    </div>
  );
}

function ClearBoard(props) {
  return (
    <div>
      <button className="clear-button" onClick={props.onClick}>
        Clear
      </button>
    </div>
  );
}

function SelectSpeed() {
  // const names = ["Fast", "Medium", "Slow"];
  // const name = names[props.speed];
  return (
    <div> 
      <button className="speed-button" >
        Speed
      </button>
    </div>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid : Array(50).fill(Array(75).fill(0)),
      simulate: false,
      speed: 100, // default fast
    }
  }

  handleTileEvent(i, j) {
    let gridCopy = this.state.grid.map( arr => arr.slice());
    console.log(gridCopy);
    gridCopy[i][j] = this.state.grid[i][j] ? 0 : 1;
    console.log(gridCopy[i][j]);
    this.setState({
      grid : gridCopy,
    })
  }

  handleSimulateEvent() {
    const newSimulate = this.state.simulate ? false : true;
    this.setState({
      simulate: newSimulate,
    });

    if (this.state.simulate) {
      this.getNextState();
    } else {
      if (this.timeoutHandler) {
        window.clearTimeout(this.timeoutHandler);
        this.timeoutHandler = null;
      }
    }
  }

  getNextState() {
    let nextGrid = this.state.grid.map( arr => arr.slice());

    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        let aliveNeighbors = getCellsAlive(this.state.grid, row, col);
        if (aliveNeighbors === 3) { // any cell with 3 live cells lives
          nextGrid[row][col] = 1;
        } else if (aliveNeighbors === 2 && nextGrid[row][col] === 1) { // live cells with 2 live cells live
          nextGrid[row][col] = 1;
        } else { // all else die or stay dead
          nextGrid[row][col] = 0; 
        }
      }
    }

    this.setState({
      grid: nextGrid,
    });

    this.timeoutHandler = window.setTimeout( () => {
      this.getNextState();
    }, this.state.speed);
  } 

  handleClearEvent() {
    const clearGrid = Array(50).fill(Array(75).fill(0));
    this.setState({
      grid : clearGrid,
    });
  }

  render() {
    const tiles = this.state.grid.map( (row, i) => {
      return (
        this.state.grid[i].map( (val, j) => {
          return (
              <BoardButton keyID={`${i}-${j}`} tileClassName={this.state.grid[i][j] ? "tile-on" : "tile-off"} onClick={() => this.handleTileEvent(i, j)}/>
          )
        })
      );
    });

    return (
      <div>
        <div className="board" 
          style = {{
            gridTemplateColumns: `repeat(${this.state.grid[0].length}, 20px)`
          }}
        > 
          {tiles}
        </div>
        <header className="App-header">
          <h1>
            Controls
          </h1>
        </header>
        <div className="controls">
            <RunSimulation toggle={this.state.simulate} onClick={() => this.handleSimulateEvent()}/>
            <ClearBoard onClick={() => this.handleClearEvent()}/>
            <SelectSpeed/>
        </div>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Conway's Game of Life
        </h1>
      </header>
      <Board key="boardID"/>
      <header className="App-header">
        <h1>
          Graph
        </h1>
      </header>
    </div>
  );
}

export default App;
