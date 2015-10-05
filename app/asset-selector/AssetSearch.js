import React from 'react';

const AssetSearch = (props) => (
	<input type="search"
		placeholder="Search for assets"
		onChange={e => props.actions.filterAssets(e.target.value)} />
);

AssetSearch.propTypes = {
	actions: React.PropTypes.object.isRequired,
};

export default AssetSearch;
