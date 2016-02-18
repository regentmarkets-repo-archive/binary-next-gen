import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import TradingTimesRow from '../trading-times/TradingTimesRow';

export default class AssetDetailsTradingTimes extends Component {

	static propTypes = {
		times: PropTypes.object,
	};

	render() {
		const { times } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th><M m="Opens" /></th>
						<th><M m="Closes" /></th>
						<th><M m="Settles" /></th>
					</tr>
				</thead>
				<tbody>
					<TradingTimesRow times={times} compact />
				</tbody>
			</table>
		);
	}
}
