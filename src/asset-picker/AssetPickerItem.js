import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import M from '../_common/M';
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

	static defaultProps = {
		asset: {},
	};

	render() {
		const { asset, compact, onSelect, onCreateTrade, onToggleWatchlistItem } = this.props;
		const { isOpen, isInWatchlist, symbol } = asset;

		return (
			<tr className="asset-picker-item" tabIndex={0}>
				<td onClick={() => onToggleWatchlistItem(asset)}>
					<Star on={isInWatchlist} />
				</td>
				<td onClick={() => onSelect(symbol)}>
					{asset.name}
				</td>
				<td>
					{!isOpen && <span className="closed-notice"><M m="Closed" /></span>}
				</td>
				{!compact && <td onClick={() => onCreateTrade(symbol)}>
					<button className="asset-picker-trade-btn">
						Trade
					</button>
				</td>}
			</tr>
		);
	}
}
