import React from 'react';
import MarketItem from './MarketItem';

export default class MarketsList extends React.Component {

	static propTypes = {
		markets: React.PropTypes.array.isRequired
	};

	render() {

		const { markets } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th>Code</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{markets.map((market, i) =>
						<MarketItem	key={i}	market={market} />
					)}
				</tbody>
			</table>
		);
	}
}
