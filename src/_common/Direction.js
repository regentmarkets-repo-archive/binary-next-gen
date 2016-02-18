import React, { PropTypes, Component } from 'react';

const DirectionNone = ({ width, height }) =>
	<rect
		x={width / 5}
		y={height / 5 * 2}
		width={width / 5 * 3}
		height={height / 5}
		style={{ fill: 'grey ' }}
	/>;

const DirectionUp = ({ width, height }) =>
	<polygon
		points={`0,${height} ${width},${height} ${width / 2},${height / 5 * 2}`}
		style={{ fill: 'green' }}
	/>;

const DirectionDown = ({ width, height }) =>
	<polygon
		points={`0,${height / 5 * 2} ${width},${height / 5 * 2} ${width / 2},${height}`}
		style={{ fill: 'red' }}
	/>;

const getDirectionComponent = diff => {
	switch (Math.sign(diff)) {
		case -1: return DirectionDown;
		case 1: return DirectionUp;
		default: return DirectionNone;
	}
};

const Direction = ({ diff, width, height }) => {
	const DirectionComponent = getDirectionComponent(diff);
	return (
		<svg width={width} height={height}>
			<DirectionComponent width={width} height={height} />
		</svg>
	);
};

Direction.propTypes = {
	diff: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
};

Direction.defaultProps = {
	diff: 0,
	width: 15 * 0.866,
	height: 15,
};

export default Direction;
