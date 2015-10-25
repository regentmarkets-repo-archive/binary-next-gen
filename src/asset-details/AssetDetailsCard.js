import React from 'react';
import AssetDetailsTable from './AssetDetailsTable';

const AssetDetailsCard = ({assets, workspace}) => {
	const symbolSelected = assets.get('list').find(x => x.get('symbol') === workspace.get('symbolSelected'));
	return !symbolSelected ? <div /> : <AssetDetailsTable asset={symbolSelected.toSeq()} />;
};

AssetDetailsCard.propTypes = {
	assets: React.PropTypes.object.isRequired,
	workspace: React.PropTypes.object.isRequired,
};

export default AssetDetailsCard;
