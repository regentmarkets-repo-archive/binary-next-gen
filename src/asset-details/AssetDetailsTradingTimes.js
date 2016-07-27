import React, { PropTypes, PureComponent } from 'react';
import { Th } from 'binary-components';
import TradingTimesRow from '../trading-times/TradingTimesRow';

export default class AssetDetailsTradingTimes extends PureComponent {

	static propTypes = {
		times: PropTypes.object,
	};

	render() {
		const { times } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<Th className="date" text="Opens" />
						<Th className="date" text="Closes" />
						<Th className="date" text="Settles" />
					</tr>
				</thead>
				<tbody>
					<TradingTimesRow times={times} compact />
				</tbody>
			</table>
		);
	}
}
