import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classNames from 'classnames';
import Button from '../_common/Button';
import OpenCloseNotice from '../_common/OpenCloseNotice';
import Star from '../_common/Star';

export default class AssetPickerItem extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		asset: PropTypes.object.isRequired,
		compact: PropTypes.bool.isRequired,
		selected: PropTypes.bool.isRequired,
		onSelect: PropTypes.func.isRequired,
		onToggleWatchlistItem: PropTypes.func.isRequired,
		onCreateTrade: PropTypes.func,
	};

	static defaultProps = {
		asset: {},
		compact: false,
	};

	render() {
		const { asset, compact, selected, onSelect, onCreateTrade, onToggleWatchlistItem } = this.props;
		const { isOpen, isInWatchlist, symbol } = asset;
		const classes = classNames({
			'asset-picker-item': true,
			selected,
		});

		return (
			<tr tabIndex={0}
				className={classes}
				onClick={(ev) => {
					onSelect(symbol);
					ev.stopPropagation();
				}}
			>
				<td onClick={(ev) => {
					onToggleWatchlistItem(asset);
					ev.stopPropagation();
				}}
				>
					<Star on={isInWatchlist} />
				</td>
				<td>
					{asset.name}
				</td>
				<td style={{ textAlign: 'center' }}>
					<OpenCloseNotice isOpen={isOpen} />
				</td>
				{!compact &&
					<td onClick={(ev) => {
						onCreateTrade(symbol);
						ev.stopPropagation();
					}}
					>
					<Button
						className="asset-picker-trade-btn btn-secondary"
						text="Trade"
					/>
				</td>}
			</tr>
		);
	}
}
