import React from 'react';

import "./styles.css"

interface TileProps {
	keyID: string,
	tileName: string,
	onClick: () => void,
}

const Tile: React.FC<TileProps> = ({keyID, tileName, onClick}) => {
	return (
		<div>
			<div className={tileName} key={keyID} onClick={onClick}></div>
		</div>
	)
}

export default Tile;