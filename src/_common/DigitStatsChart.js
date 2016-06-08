import React, { Component, PropTypes } from 'react';
import arrayMin from 'binary-utils/lib/arrayMin';
import arrayMax from 'binary-utils/lib/arrayMax';

export default class DigitStatsChart extends Component {

	static propTypes = {
		stats: PropTypes.arrayOf(PropTypes.number).isRequired,
	};

	render() {
		const { stats } = this.props;
		const min = arrayMin(stats);
		const max = arrayMax(stats);

		return (
			<div className="digit-stats-chart">
				{stats.map((x, i) =>
					<div className="digit-stats-col">
						<div
							className="digit-stats-percentage"
							style={{ flex: 100 - x / max * 100 }}
						>
							{x.toFixed(2)}%
						</div>
						<div
							className={'digit-stats-bar'
								+ (x === max ? ' max' : '')
								+ (x === min ? ' min' : '')}
							style={{ flex: x / max * 100 }}
						/>
						<div className="digit-stats-digit">{i}</div>
					</div>
				)}
			</div>
		);
	}
}
