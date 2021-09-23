import React, { useState } from 'react';
import Tile from './Tile';
import "./styles.css";


interface BoardProps {
	grid: boolean[][],
	setGrid: (grid: boolean[][]) => void,
	iteration: number,
	cellsAlive: number,
	setCellsAlive: (cellsAlive: number) => void,
}

const Board: React.FC<BoardProps> = ({ grid, setGrid, iteration, cellsAlive, setCellsAlive }) => {

	const handleTileEvent = (i: number, j: number) => {
		let gridCopy: boolean[][] = grid.map(arr => arr.slice());
		gridCopy[i][j] = grid[i][j] ? false : true;
		grid[i][j] ? setCellsAlive(cellsAlive - 1) : setCellsAlive(cellsAlive + 1);
		setGrid(gridCopy);
		
	}

	// TODO: Add Borders around Iteration and CellsAlive header tags
	return (
		<div className="board-container">
			<h1> 
				Iteration: {iteration}
			</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${grid[0].length}, 20px`,
					justifyContent: "center"
				}}
			>
				{ grid.map( (row, i) => {
					return (
						grid[i].map( (val, j) => {
							return (
								<Tile 
									keyID={`${i}-${j}`} 
									tileName={grid[i][j] ? "tile-on" : "tile-off"}	
									onClick={() => handleTileEvent(i, j)} 
								/>
							)
						})
					)
				}) }
			</div>
			<h1>
				Cells Alive: {cellsAlive}
			</h1>
		</div>
	)
}

export default Board;