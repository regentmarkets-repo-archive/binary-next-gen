import React from 'react';

const MarketSubmarketSelector = ({tree, showAllOption}) => (
	<select className="market-submarket-selector">
		{showAllOption ? <option>All</option> : null}
		{Object.keys(tree).map(market => (
			<optgroup key={market} label={market}>
				{Object.keys(tree[market]).map(submarket =>
					<option key={submarket} value={submarket}>{submarket}</option>
				)}
			</optgroup>
		))}
	</select>
);

MarketSubmarketSelector.propTypes = {
	tree: React.PropTypes.object.isRequired,
	showAllOption: React.PropTypes.bool.isRequired,
};

MarketSubmarketSelector.defaultProps = {
	showAllOption: false,
};

export default MarketSubmarketSelector;
