import React from "react";

interface GraphButtonProps {
	showGraph: boolean,
	setShowGraph: (show: boolean) => void,
}

const GraphButton: React.FC<GraphButtonProps> = ({ showGraph, setShowGraph }) => {
	const name = showGraph ? "Hide Graph" : "Show Graph";

	return (
		<div>
			<button className="control-button" onClick={() => setShowGraph(!showGraph)}>
				{ name }
			</button>
		</div>
	);
}

export default GraphButton;