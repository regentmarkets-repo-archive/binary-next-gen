import React from 'react';
import TradingTimesRow from './TradingTimesRow';

export default class TradingTimesTable {

	static propTypes = {
		submarket: React.PropTypes.object.isRequired,
	};

	render() {
		const { submarket } = this.props;

		return (
			<table>
				<thead>
                    <tr>
                        <th colSpan="100">
                            {submarket.name}
                        </th>
                    </tr>
					<tr>
						<th>Asset</th>
						<th>Opens</th>
						<th>Closes</th>
                        <th>Settles</th>
                        <th>Upcoming Events</th>
					</tr>
				</thead>
				<tbody>
                    {submarket.symbols.map((s, i) => <TradingTimesRow key={i} symbol={s} />)}
				</tbody>
			</table>
		);
	}
}
