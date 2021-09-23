import React from "react"

// HACK: used any here
interface RunSimulationProps {
	run: boolean,
	setRun: (run: boolean) => void, // waving the white flag
	runGame: () => void,
	runRef: any;
}

const RunSimulation: React.FC<RunSimulationProps> = ({ 
	run, 
	setRun, 
	runRef, 
	runGame, 
}) => {
	const name = run ? "Stop" : "Run";

	const handleRun = () => {
		setRun(!run);
		if (!run) {
			runRef.current = true;
			runGame();
		}
	}
	
	return (
		<div>

			<button className="control-button" onClick={() => handleRun()}>
				{name}
			</button>
		</div>

	);
}

export default RunSimulation;