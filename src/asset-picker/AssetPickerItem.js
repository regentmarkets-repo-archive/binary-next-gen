import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Star from '../_common/Star';

export default class AssetPickerItem extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		asset: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		onSelect: PropTypes.func.isRequired,
		onToggleWatchlistItem: PropTypes.func.isRequired,
		onCreateTrade: PropTypes.func,
	};

	render() {
		const { asset, compact, onSelect, onCreateTrade, onToggleWatchlistItem } = this.props;

		return (
			<tr className="asset-picker-item" tabIndex={0}>
				<td onClick={() => onToggleWatchlistItem(asset)}>
					<Star on={asset.isInWatchlist} />
				</td>
				<td onClick={() => onSelect(asset.symbol)}>
					{asset.name}
				</td>
				<td className="market-hierarchy" onClick={() => onSelect(asset.symbol)}>
					{asset.market + ' > ' + asset.submarket}
				</td>
				{!compact && <td onClick={() => onCreateTrade(asset.symbol)}>
					<button className="asset-picker-trade-btn">
						<img src="img/trade.svg" style={{ width: '1rem' }} />
					</button>
				</td>}
			</tr>
		);
	}
}
