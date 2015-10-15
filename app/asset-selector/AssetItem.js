import React from 'react';
import { Star, InfoIcon } from '../common';

const AssetItem = ({asset, isFavorite, onSelect, onFavor}) => (
	<tr onClick={() => onSelect(asset.symbol)}>
		<td>
			<Star on={isFavorite} onClick={() => onFavor(asset.symbol)} />
		</td>
		<td>
			{asset.display_name}
		</td>
		<td style={{ fontSize: '.8rem' }}>
			{asset.market_display_name + ' > ' + asset.submarket_display_name}
		</td>
		<td>
			<InfoIcon />
		</td>
	</tr>
);

AssetItem.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

export default AssetItem;
