import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Star } from '../_common';

export default class AssetSelectorItem extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		isFavorite: PropTypes.bool.isRequired,
		asset: PropTypes.object.isRequired,
		onSelect: PropTypes.func.isRequired,
		onFavor: PropTypes.func.isRequired,
		onUnfavor: PropTypes.func.isRequired,
		isSelected: PropTypes.bool,
	};

	toggleFavorite() {
		const { asset, onFavor, onUnfavor, isFavorite } = this.props;
		const symbol = asset.get('symbol');
		if (isFavorite) {
			onUnfavor(symbol);
		} else {
			onFavor(symbol);
		}
	}

	render() {
		const { asset, onSelect, isFavorite, isSelected } = this.props;

		return (
			<tr className={isSelected ? 'focus-like' : ''} tabIndex={0}>
				<td onClick={::this.toggleFavorite}>
					<Star on={isFavorite} />
				</td>
				<td onClick={() => onSelect(asset.get('symbol'))}>
					{asset.get('display_name')}
				</td>
				<td className="market-hierarchy" onClick={() => onSelect(asset.get('symbol'))}>
					{asset.get('market_display_name') + ' > ' + asset.get('submarket_display_name')}
				</td>
				<td>
					<img src="img/info.svg" style={{ width: '1rem' }} />
				</td>
			</tr>
		);
	}
}
