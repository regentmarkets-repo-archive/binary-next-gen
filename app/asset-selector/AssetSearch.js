import React from 'react';
import { InputGroup } from '../common';

const AssetSearch = ({actions}) => (
	<InputGroup
		className="asset-search"
		type="search"
		placeholder="Search for assets"
		onChange={e => actions.filterAssets(e.target.value)} />
);

AssetSearch.propTypes = {
	actions: React.PropTypes.object.isRequired,
};

export default AssetSearch;
