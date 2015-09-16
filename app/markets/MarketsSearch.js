import React from 'react';

const MarketSearch = (props) => (
	<input type="search"
		placeholder="Search for markets"
		onChange={e => props.actions.filterMarkets(e.target.value)} />
);

MarketSearch.propTypes = {
	actions: React.PropTypes.object.isRequired,
};

export default MarketSearch;
