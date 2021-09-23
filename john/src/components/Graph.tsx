import React from 'react';
import { Line } from 'react-chartjs-2';

interface GraphProps {
	iterationArray: number[], 
	cellsAliveArray: number[],
	showGraph: boolean,
}

const Graph: React.FC<GraphProps> = ({ iterationArray, cellsAliveArray, showGraph }) => {
	if (!showGraph) return null;

	const data: any = {
		labels: iterationArray,
		datasets: [{
		label: 'Game Data',
		data: cellsAliveArray,
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

	return (
		<div>
			<Line data={data} options={options} />
		</div>
	)
}


export default Graph;