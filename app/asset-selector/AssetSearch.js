import React from 'react';
import { InputGroup } from '../common';

const AssetSearch = (props) => (
	<InputGroup type="search"
		placeholder="Search for assets"
		onChange={e => props.actions.filterAssets(e.target.value)} />
);

AssetSearch.propTypes = {
	actions: React.PropTypes.object.isRequired,
};

export default AssetSearch;
