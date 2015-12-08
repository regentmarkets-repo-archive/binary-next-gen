import React, { PropTypes } from 'react';

const Direction = ({ diff, width, height }) => (
	<svg width={width} height={height}>
		{ diff === 0 ? <rect x={width / 5} y={height / 5 * 2} width={width / 5 * 3} height={height / 5} style={{ fill: 'grey ' }} /> : null }
		{ diff > 0 ? <polygon points={`0,${height / 5 * 4} ${width},${height / 5 * 4} ${width / 2},${height / 5}`} style={{ fill: 'green' }} /> : null }
		{ diff < 0 ? <polygon points={`0,${height / 5 * 2} ${width},${height / 5 * 2} ${width / 2},${height}`} style={{ fill: 'red' }} /> : null }
	</svg>
);

Direction.propTypes = {
	diff: PropTypes.number.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

Direction.defaultProps = {
	width: 20,
	height: 20,
};

export default Direction;
