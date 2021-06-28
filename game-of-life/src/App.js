import React, {useState} from 'react';
import './App.css';

// function handleGenerations() {

// }

// function RunGenerations() {
//   return (
//     <div>
//       <button onClick={handleGenerations()} >
//         Run Game;
//       </button>
//     </div>
//   )
// }

function  BoardButton(props) {
  const name = props.tileClassName === "tile-on" ? "on" : "off";
  // console.log("HI");
  return (
    // <div className={props.tileClassName} key={props.keyID} onClick={props.onClick}/>
    // <div className={props.tileClassName} key={props.keyID} >
    //   {`${props.keyID}`}
    //   {/* {`${props.tileClassName}`} */}


    <div className={props.tileClassName} key={props.keyID} onClick={props.onClick}>
      {/* {name} */}
    </div>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid : Array(50).fill(Array(50).fill(0)),
      simulate: false,
    }
  }

  handleTileEvent(i, j) {
    console.log(`${i}-${j}`)
    let gridCopy = this.state.grid.map( arr => arr.slice());
    console.log(gridCopy);
    gridCopy[i][j] = this.state.grid[i][j] ? 0 : 1;
    console.log(gridCopy[i][j]);
    this.setState({
      grid : gridCopy,
    })
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

    // const tiles = this.state.grid.map( (row, i) => {
    //   this.state.grid[j].map( (val, j) => {
    //     {
    //       value : val,
    //       x : i,
    //       y : j,
    //     };
    //   }
    // });

    // console.log(tiles);

    return (
      <div>
        <div className="board" 
          style = {{
            gridTemplateColumns: `repeat(${this.state.grid[0].length}, 20px)`
          }}
        > 
          {tiles}
        </div>
      </div>
    );
  }
}

function RunSinmulation() {

  // handleClick = () => {

  // }
  return (
    <div>
      <button className="simulate-button">
        Simulate
      </button>
    </div>
  );
}

function ClearBoard() {
  return (
    <div>
      <button className="clear-button">
        Clear
      </button>
    </div>
  );
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
          Controls
        </h1>
      </header>
      <div className="controls">
          <RunSinmulation />
          <ClearBoard />
      </div>
      <header className="App-header">
        <h1>
          Graph
        </h1>
      </header>
    </div>
  );
}

export default App;
