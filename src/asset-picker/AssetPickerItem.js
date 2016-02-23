import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
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

	static defaultProps = {
		asset: {},
	};

	render() {
		const { asset, compact, onSelect, onCreateTrade, onToggleWatchlistItem } = this.props;
		const { isOpen, isInWatchlist, symbol } = asset;
		const itemClasses = classNames({
			'asset-picker-item': true,
			'market-closed': !isOpen,
		});

		return (
			<tr className={itemClasses} tabIndex={0}>
				<td onClick={() => onToggleWatchlistItem(asset)}>
					<Star on={isInWatchlist} />
				</td>
				<td onClick={() => onSelect(symbol)}>
					{asset.name}
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
