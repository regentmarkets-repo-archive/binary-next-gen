import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classnames from 'classnames';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import Star from 'binary-components/lib/Star';

export default class AssetPickerItem extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		asset: PropTypes.object,
		selected: PropTypes.bool,
		onSelect: PropTypes.func,
		onClose: PropTypes.func,
		onToggleWatchlistItem: PropTypes.func,
	};

	static defaultProps = {
		asset: {},
		selected: false,
	};

	render() {
		const { asset, selected, onClose, onSelect, onToggleWatchlistItem } = this.props;
		const { isOpen, isInWatchlist, symbol } = asset;
		const classes = classnames('asset-picker-item', selected);

		return (
			<tbody>
				<tr
					className={classes}
					onClick={(ev) => {
						onSelect(symbol);
						onClose();
						ev.stopPropagation();
					}}
				>
					<td
						onClick={(ev) => {
						onToggleWatchlistItem(asset);
						ev.stopPropagation();
					}}
					>
						<Star on={isInWatchlist} />
					</td>
					<td>
						{asset.name}
					</td>
					<td style={{ textAlign: 'right' }}>
						<OpenCloseNotice isOpen={isOpen} />
					</td>
				</tr>
			</tbody>
		);
	}
}
