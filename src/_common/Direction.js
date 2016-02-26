import React, { PropTypes, Component } from 'react';

const DirectionNone = ({ width, height }) =>
	<rect
		x={width / 5}
		y={height / 5 * 3}
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

DirectionNone.propTypes = DirectionUp.propTypes = DirectionDown.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

const getDirectionComponent = diff => {
	switch (Math.sign(diff)) {
		case -1: return DirectionDown;
		case 1: return DirectionUp;
		default: return DirectionNone;
	}
};

export default class Direction extends Component {

	static propTypes = {
		diff: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
	};

	static defaultProps = {
		diff: 0,
		width: 15 * 0.866,
		height: 15,
	};

	render() {
		const { diff, width, height } = this.props;
		const DirectionComponent = getDirectionComponent(diff);

		return (
			<svg width={width} height={height}>
				<DirectionComponent width={width} height={height} />
			</svg>
		);
	}
}
