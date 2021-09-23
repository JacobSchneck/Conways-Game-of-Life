import React, { useState } from "react";
import Speed from "../../types/Speed"

interface SelectSpeedProps {
	speed: Speed,
	setSpeed: (speed: Speed) => void, 
	speedRef: React.MutableRefObject<Speed>,
}

const SelectSpeed: React.FC<SelectSpeedProps> = ({ speed, setSpeed, speedRef }) => {
	const [count, setCount] = useState(0);

	const handleSpeedEvent = () => {
		if (count == 3) {
			setCount(0);
		} else {
			setCount(count + 1);
		}

		switch (count % 4) {
			case 0:
				setSpeed("Slow");
				speedRef.current = "Slow";
				break;
			case 1:
				setSpeed("Medium");
				speedRef.current = "Medium";
				break;
			case 2:
				setSpeed("Fast");
				speedRef.current = "Fast";
				break;
			case 3:
				setSpeed("Brrr");
				speedRef.current = "Brrr";
				break;
			default:
				break;
		}
	}

	return (
		<div>
			<button className="control-button" onClick={() => handleSpeedEvent()}>
				{speed}
			</button>
		</div>
	);
}

export default SelectSpeed;