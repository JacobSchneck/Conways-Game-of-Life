import React, {useState} from 'react';
import './App.css';
	import {Line} from 'react-chartjs-2';

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

//---------------------------------- Tile Components ----------------------------------

function  BoardButton(props) {
  const name = props.tileClassName === "tile-on" ? "on" : "off";
  return (
    <div className={props.tileClassName} key={props.keyID} onClick={props.onClick}></div>
  )
}

//---------------------------------- Control Components -------------------------------

function RunSimulation(props) {
  const name = props.toggle ? "Stop" : "Run"

  return (
    <div>
      <button className="control-button" onClick={props.onClick}>
        {name}
      </button>
    </div>
  );
}

function ClearBoard(props) {
  return (
    <div>
      <button className="control-button" onClick={props.onClick}>
        Clear
      </button>
    </div>
  );
}

function SelectSpeed(props) {
  const names = ["Slow", "Medium", "Fast", "Brrrrr"];
  const name = names[props.nameIndex % 4];
  // console.log(props.speedIndex);
  return (
    <div> 
      <button className="control-button" onClick={props.onClick}>
        {name}
      </button>
    </div>
  )
}

function GraphButton(props) {
  const name = props.name ? "Show Graph" : "Hide Graph";
  return (
    <div>
      <button className="control-button" onClick={props.onClick}>
        {name}
      </button>
    </div>
  )
}



//---------------------------------- Graph Components ---------------------------------
function MakeChart(props) {
  const data = {
    labels: props.graphData.xData,
    datasets: [{
      label: 'Game Data',
      data: props.graphData.yData,
      fill: false,
      borderColor: 'rgb(1, 1, 1)',
      backgroundColor: 'rgb(1, 1, 1)',
      tension: 0.1,
    }]
  };

  const options = {
    animation: {
        duration: 0
    }
  }


  if (!props.hideGraph) {
    return (
      <>
        <Line data={data} options={options}/>
      </>
    );
  }

  return null;
}



//---------------------------------- Board Components ---------------------------------
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid : Array(50).fill(Array(75).fill(0)),
      simulate: false,
      speedCount: 0,
      iteration: 0,
      cellsAlive: 0,
      hideGraph: false,
      graphData: {
        xData: [],
        yData: [],
      }
    }
    this.xData = [0];
    this.yData = [0];
    this.speed = [1000, 300, 100, 15];
  }

  handleTileEvent(i, j) {
    let gridCopy = this.state.grid.map( arr => arr.slice());
    gridCopy[i][j] = this.state.grid[i][j] ? 0 : 1;

    this.setState((prevState) => ({
      grid : gridCopy,
      cellsAlive: prevState.cellsAlive + (prevState.grid[i][j] ? -1 : 1),
      // graphData: {
      //   yData: prevState.graphData.xData.push(prevState.cellsAlive + (prevState.grid[i][j] ? -1 : 1)),
      // }
    }), () => {
      // console.log(`${this.state.cellsAlive}`);
      this.yData[this.yData.length - 1] = this.state.cellsAlive;
    });
  }

  handleSimulateEvent() {
    const newSimulate = this.state.simulate ? false : true;
    this.setState({
      simulate: newSimulate,
    });

    if (newSimulate) {
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
    let nextCellsAlive = 0;

    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        let aliveNeighbors = getCellsAlive(this.state.grid, row, col);
        if (aliveNeighbors === 3) { // any cell with 3 live cells lives
          nextGrid[row][col] = 1;
          nextCellsAlive += 1;
        } else if (aliveNeighbors === 2 && nextGrid[row][col] === 1) { // live cells with 2 live cells live
          nextGrid[row][col] = 1;
          nextCellsAlive += 1;
        } else { // all else die or stay dead
          nextGrid[row][col] = 0; 
        }
      }
    }

    this.setState( (prevState) => ({
      grid: nextGrid,
      iteration: prevState.iteration + 1,
      cellsAlive: nextCellsAlive,
      graphData: {
        xData: this.xData,
        yData: this.yData,
      }
    }), () => {
      // console.log((`${this.state.iteration}-${this.state.cellsAlive}`));
      this.xData.push(this.state.iteration);
      this.yData.push(this.state.cellsAlive);
    });

    this.timeoutHandler = window.setTimeout( () => {
      this.getNextState();
    }, this.speed[this.state.speedCount % 4]);
  } 

  handleClearEvent() {
    const clearGrid = Array(50).fill(Array(75).fill(0));
    this.setState(() => ({
      grid : clearGrid,
      iteration: 0,
      cellsAlive: 0,
      graphData: {
        xData: [],
        yData: [],
      }
    }), () => {
      // console.log((`${this.state.iteration}-${this.state.cellsAlive}`));
      this.xData = [0];
      this.yData = [0];
    });
  }

  handleSpeedEvent() {
    this.setState( (prevState) => ({
      speedCount : prevState.speedCount + 1,
    }), 
    // () => console.log(`${this.state.speedCount}-${this.state.speedCount % 4}-${this.speed[this.state.speedCount % 4]}`)
    );
  }

  handleGraphEvent() {
    this.setState((prevState) => ({
      hideGraph: !prevState.hideGraph,
    }));
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
        <div className="board-container">
          <div>
            <h1>
              Iteration:
            </h1>
            <div>
              <h1>
                {this.state.iteration}
              </h1>
            </div>
          </div>
          <div className="board" 
            style = {{
              gridTemplateColumns: `repeat(${this.state.grid[0].length}, 20px)`
            }}
          > 
            {tiles}
          </div>
          <div>
            <h1>
              Cells Alive:
            </h1>
            <div>
              <h1>
                {this.state.cellsAlive}
              </h1>
            </div>
          </div>
        </div>
        <header className="App-header">
          <h1>
            Controls
          </h1>
        </header>
        <div className="controls">
            <RunSimulation toggle={this.state.simulate} onClick={() => this.handleSimulateEvent()}/>
            <ClearBoard onClick={() => this.handleClearEvent()}/>
            <SelectSpeed nameIndex={this.state.speedCount} onClick={() => this.handleSpeedEvent()}/>
            <GraphButton name={this.state.hideGraph} onClick={() => this.handleGraphEvent()}/>
        </div>
        <header className="App-header">
          <h1>
            Graph
          </h1>
        </header>
        <div className="graph-container">
            <MakeChart hideGraph={this.state.hideGraph} graphData={this.state.graphData}/>
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
    </div>
  );
}

export default App;
