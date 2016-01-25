import React, { PropTypes } from 'react';
import AssetDetailsTable from './AssetDetailsTable';

const AssetDetailsCard = ({ assets, workspace }) => {
	const symbolSelected = assets.get('list').find(x => x.get('symbol') === workspace.get('symbolSelected'));
	return symbolSelected ? <AssetDetailsTable asset={symbolSelected.toJS()} /> : <div />;
};

AssetDetailsCard.propTypes = {
	assets: PropTypes.object.isRequired,
	workspace: PropTypes.object.isRequired,
};

export default AssetDetailsCard;
