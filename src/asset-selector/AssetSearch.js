import React, { PropTypes } from 'react';
import { InputGroup } from '../_common';

const AssetSearch = ({ onChange }) => (
	<InputGroup
		className="asset-search"
		type="search"
		placeholder="Search for assets"
		onChange={onChange} />
);

AssetSearch.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default AssetSearch;
