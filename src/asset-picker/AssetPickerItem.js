import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Star from '../_common/Star';

export default class AssetPickerItem extends Component {

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
				{!compact && <td onClick={() => onCreateTrade(asset.symbol)}>
					<button className="asset-picker-trade-btn">
						Trade
					</button>
				</td>}
			</tr>
		);
	}
}
