import { useCallback, useRef, useEffect, useState } from "react";

import Board from "./components/Board"
import "./App.css";
import RunSimulation from "./components/Controls/RunSimulation";
import SelectSpeed from "./components/Controls/SelectSpeed";
import GraphButton from "./components/Controls/GraphButton";
import ClearBoard from "./components/Controls/ClearBoard";
import { getNextState, NextStateType } from "./utils";
import Speed from "./types/Speed";
import Graph from "./components/Graph";

const App: React.FC = () => {
	const [run, setRun] = useState<boolean>(false);
	const [speed, setSpeed] = useState<Speed>("Slow");
	const [showGraph, setShowGraph] = useState<boolean>(false);
	const [iteration, setIteration] = useState<number>(0);
	const [cellsAlive, setCellsAlive] = useState<number>(0);
	const [grid, setGrid] = useState<boolean[][]>(Array(50).fill(Array(75).fill(0)))
	const [iterationArray, setIterationArray] = useState<Array<number>>([0]);
	const [cellsAliveArray, setCellsAlliveArray] = useState<Array<number>>([0]);

	const runRef = useRef<boolean>(run);
	runRef.current = run
	const speedRef = useRef<Speed>(speed);
	speedRef.current = speed;

	const runGame = useCallback(() => {
		if (!runRef.current) {
			return;
		}
		
		// HACK: jank but it works 
		setGrid((g) => {
			const {nextGrid, nextCellsAlive }: NextStateType = getNextState(g);
			setCellsAlive(nextCellsAlive);
			setCellsAlliveArray((cellsAliveArray) => [...cellsAliveArray, nextCellsAlive]);
			return nextGrid;
		});

		setIteration( (i) => i + 1); // why does this update everytime but setIteration(i + 1) does not?
		setIterationArray((iterationArray) => [...iterationArray, iteration]);

		switch ( speedRef.current ) {
			case "Slow":
				setTimeout(runGame, 1000);
				break;
			case "Medium":
				setTimeout(runGame, 500);
				break;
			case "Fast":
				setTimeout(runGame, 250);
				break;
			case "Brrr":
				setTimeout(runGame, 100);
				break;
		}


	}, []);

	return (
		<div>
			<header className="basic-header">
				<h1>
					Conway's Game of Life
				</h1>
			</header>
			<Board 
				grid={grid} 
				setGrid={setGrid} 
				iteration={iteration} 
				cellsAlive={cellsAlive}
				setCellsAlive={setCellsAlive}
			/>
			<header className="basic-header">
				<h1>
					Controls	
				</h1>
			</header>
			<div className="controls-container">
				<RunSimulation 
					run={run} 
					setRun={setRun} 
					runRef={runRef} 
					runGame={runGame} 
				/>
				<ClearBoard 
					setGrid={setGrid} 
					setIteration={setIteration} 
					setCellsAlive={setCellsAlive}
					setIterationArray={setIterationArray}
					setCellsAliveArray={setCellsAlliveArray}
				/>
				<SelectSpeed 
					speed={speed}
					setSpeed={setSpeed}
					speedRef={speedRef}
				/>
				<GraphButton 
					showGraph={showGraph}
					setShowGraph={setShowGraph}
				/>
			</div>
			<header className="basic-header">
				<h1>
					Graph	
				</h1>
			</header>
			{/* <div style={{background: "rgb(250, 119, 119)"}}> */}
				<div className="graph-container">
					<Graph 
						iterationArray={iterationArray} 
						cellsAliveArray={cellsAliveArray} 
						showGraph={showGraph} 
					/>
				</div>
			{/* </div> */}
		</div>
	)
}


export default App;