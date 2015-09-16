import React from 'react';

const MarketItem = (props) => (
	<tr>
		<td>
			{props.market.id}
		</td>
		<td>
			{props.market.name}
		</td>
	</tr>
);

MarketItem.propTypes = {
	market: React.PropTypes.object.isRequired,
};

export default MarketItem;
