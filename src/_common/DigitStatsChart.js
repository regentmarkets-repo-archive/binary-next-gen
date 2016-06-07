import React, { Component, PropTypes } from 'react';

export default class DigitStatsChart extends Component {

	static propTypes = {
		stats: PropTypes.arrayOf(PropTypes.number),
	};

	render() {
		const { stats } = this.props;

		return (
			<div className="digit-stats-chart">
				{stats.map((x, i) =>
					<div className="digit-stats-col">
						<div className="digit-stats-percentage">{x}%</div>
						<div className="digit-stats-bar" />
						<div className="digit-stats-digit">{i}</div>
					</div>
				)}
			</div>
		);
	}
}
