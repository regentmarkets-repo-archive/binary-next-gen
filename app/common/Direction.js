import React from 'react';

export default class Direction {

	static propTypes = {
		diff: React.PropTypes.number.isRequired,
		width: React.PropTypes.number,
		height: React.PropTypes.number
	};

	static defaultProps = {
		width: 20,
		height: 20
	};

	render() {

		const { diff, width, height } = this.props;

		return (
			<svg width={width} height={height}>
				{ diff === 0 ? <rect x={width / 5} y={height / 5 * 2} width={width / 5 * 3} height={height / 5} style={{fill: 'grey'}} /> : null }
				{ diff > 0 ? <polygon points={`0,${height / 5 * 4} ${width},${height / 5 * 4} ${width / 2},${height / 5}`} style={{fill: 'green'}} /> : null }
				{ diff < 0 ? <polygon points={`0,${height / 5 * 2} ${width},${height / 5 * 2} ${width / 2},${height}`} style={{fill: 'red'}} /> : null }
			</svg>
		);
	}
}
