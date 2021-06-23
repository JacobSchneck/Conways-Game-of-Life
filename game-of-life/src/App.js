import React, {useState} from 'react';
import './App.css';

//function handleGenerations() {
//
//}
//
//function RunGenerations() {
//
//}

function Board() {
  // const[board, setBoard] = useState([...Array(6)].map(e => Array.fill(6)));
  // let board = Array(6).fill(Array(6).fill(0));
  const [board, setBoard]  = useState(Array(6).fill(Array(6).fill(0)));
  console.log(board);


  return (
    <div className="Board">
      Hello
    </div>
  )

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Conway's Game of Life
        </h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
