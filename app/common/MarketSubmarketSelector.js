import React from 'react';

const MarketSubmarketSelector = ({tree}) => (
	<select>
		<option>All</option>
		{Object.keys(tree).map(market => (
			<optgroup key={market} label={market}>
				{Object.keys(tree[market]).map(submarket => <option key={submarket} value={submarket}>{submarket}</option>)}
			</optgroup>
		))}
	</select>
);

MarketSubmarketSelector.propTypes = {
	tree: React.PropTypes.object.isRequired,
};

MarketSubmarketSelector.defaultProps = {
	markets: [],
};

export default MarketSubmarketSelector;
