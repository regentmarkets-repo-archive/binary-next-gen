import React from 'react';
import AssetDetailsTable from './AssetDetailsTable';

const AssetDetailsCard = ({assets, workspace}) => {
	const symbolDetails = assets.get('list').find(x => x.get('symbol') === workspace.get('symbolDetails'));
	return !selectedAsset ? <div /> : <AssetDetailsTable asset={symbolDetails.toSeq()} />;
};

AssetDetailsCard.propTypes = {
	assets: React.PropTypes.object.isRequired,
	workspace: React.PropTypes.object.isRequired,
};

export default AssetDetailsCard;
