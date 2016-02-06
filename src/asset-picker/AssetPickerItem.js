import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Star } from '../_common';

export default class AssetPickerItem extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		asset: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		isFavorite: PropTypes.bool.isRequired,
		onSelect: PropTypes.func.isRequired,
		onFavor: PropTypes.func.isRequired,
		onUnfavor: PropTypes.func.isRequired,
		onCreateTrade: PropTypes.func,
	};

	toggleFavorite() {
		const { asset, onFavor, onUnfavor, isFavorite } = this.props;
		const symbol = asset.symbol;
		if (isFavorite) {
			onUnfavor(symbol);
		} else {
			onFavor(symbol);
		}
	}

	render() {
		const { asset, compact, onSelect, onCreateTrade, isFavorite } = this.props;

		return (
			<tr className="asset-picker-item" tabIndex={0}>
				<td onClick={::this.toggleFavorite}>
					<Star on={isFavorite} />
				</td>
				<td onClick={() => onSelect(asset.symbol)}>
					{asset.display_name}
				</td>
				<td className="market-hierarchy" onClick={() => onSelect(asset.symbol)}>
					{asset.market_display_name + ' > ' + asset.submarket_display_name}
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
