import React, { PropTypes, Component } from 'react';
import InputGroup from 'binary-components/lib/InputGroup';

const AssetSearch = ({ onChange }) => (
	<InputGroup
		className="asset-search"
		type="search"
		placeholder="Search for assets"
		onChange={onChange}
	/>
);

AssetSearch.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default AssetSearch;
