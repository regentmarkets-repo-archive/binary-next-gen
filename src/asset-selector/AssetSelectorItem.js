import React from 'react';
import { Star } from '../_common';

export default class AssetSelectorItem extends React.Component {

	static propTypes = {
		isFavorite: React.PropTypes.bool.isRequired,
		asset: React.PropTypes.object.isRequired,
		onSelect: React.PropTypes.func.isRequired,
		onFavor: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.asset !== this.props.asset ||
			nextProps.isFavorite !== this.props.isFavorite;
	}

	render() {
	 	const {asset, isFavorite, onSelect, onFavor} = this.props;

		return (
			<tr onClick={() => onSelect(asset.get('symbol'))}>
				<td>
					<Star on={isFavorite} onClick={() => onFavor(asset.get('symbol'))} />
				</td>
				<td>
					{asset.get('display_name')}
				</td>
				<td style={{ fontSize: '.8rem' }}>
					{asset.get('market_display_name') + ' > ' + asset.get('submarket_display_name')}
				</td>
				<td>
					<span className="info-icon"> i</span>
				</td>
			</tr>
		);
	}
}
