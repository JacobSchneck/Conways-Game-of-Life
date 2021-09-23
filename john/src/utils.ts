
/*
@params: grid: boolean[][], int row, int col
@result: number of alive adjacent cells
*/
export const getCellsAlive = (grid: boolean[][], row: number, col: number): number => {
	let result = 0;
	for (let i = (row > 0 ? -1 : 0); i < (row < grid.length - 1 ? 2 : 1); i++) {
		for (let j = (col > 0 ? -1 : 0); j < (col < grid[0].length - 1 ? 2 : 1); j++) {
			if (i === 0 && j === 0) {
			continue;
			}
			const x = row + i;
			const y = col + j;
			if (grid[x][y] === true) {
			result += 1;
			}
		}
	}
	return result;
}

export interface NextStateType {
	nextGrid: boolean[][],
	nextCellsAlive: number,
}

export const getNextState = (grid: boolean[][]): NextStateType => {
	const nextGrid = grid.map( arr => arr.slice()); 
	let nextCellsAlive = 0;
	for (let row = 0; row < nextGrid.length; row++) {
		for (let col = 0; col < nextGrid[0].length; col++) {
			let aliveNeighbors = getCellsAlive(grid, row, col);
			if (aliveNeighbors === 3) { // any cell with 3 live cells lives
				nextGrid[row][col] = true;
				nextCellsAlive += 1;
			} else if (aliveNeighbors === 2 && nextGrid[row][col] === true) { // live cells with 2 live cells live
				nextGrid[row][col] = true;
				nextCellsAlive += 1;
			} else { // all else die or stay dead
				nextGrid[row][col] = false;
			}
		}
	}

	return { 
		nextGrid, 
		nextCellsAlive 
	};
}