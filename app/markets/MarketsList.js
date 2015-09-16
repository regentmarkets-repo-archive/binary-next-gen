import React from 'react';
import MarketItem from './MarketItem';

const MarketsList = (props) => (
	<table>
		<thead>
			<tr>
				<th>Code</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			{props.markets.map((market, i) =>
				<MarketItem	key={i}	market={market} />
			)}
		</tbody>
	</table>
);

MarketsList.propTypes = {
	markets: React.PropTypes.array.isRequired,
};

export default MarketsList;
