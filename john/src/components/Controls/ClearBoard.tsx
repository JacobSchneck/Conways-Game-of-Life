import React from "react";
import { setOriginalNode } from "typescript";

interface ClearButtonProps {
	setGrid: (grid: boolean[][]) => void,
	setIteration: (iteration: number) => void,
	setCellsAlive: (cellsAlive: number) => void,
	setIterationArray: (iterationArray: number[]) => void,
	setCellsAliveArray: (cellsAliveArray: number[]) => void,
}

const ClearBoard: React.FC<ClearButtonProps> = ({ 
	setGrid, 
	setIteration, 
	setCellsAlive,
	setIterationArray,
	setCellsAliveArray,
}) => {
	return (
		<div>
			<button className="control-button" onClick={
				() => {
					setGrid(Array(50).fill(Array(75).fill(0)))
					setIteration(0);
					setCellsAlive(0);
					setIterationArray([0]);
					setCellsAliveArray([0]);
				}
			}>
				Clear
			</button>
		</div>
	);
}

export default ClearBoard;