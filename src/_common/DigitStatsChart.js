import React, { Component, PropTypes } from 'react';
import arrayMin from 'binary-utils/lib/arrayMin';
import arrayMax from 'binary-utils/lib/arrayMax';

export default class DigitStatsChart extends Component {

	static propTypes = {
		orientation: PropTypes.string,
		stats: PropTypes.arrayOf(PropTypes.number).isRequired,
	};

	render() {
		const { stats, orientation } = this.props;
		const min = arrayMin(stats);
		const max = arrayMax(stats);

		return (
			<div className={'digit-stats-chart ' + orientation}>
				{stats.map((x, i) =>
					<div key={i} className="digit-stats-col">
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
