import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classnames from 'classnames';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import Star from 'binary-components/lib/Star';

export default class AssetPickerItem extends Component {

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

	shouldComponentUpdate = shouldPureComponentUpdate;

	onRowClicked = e => {
		const { asset, onClose, onSelect } = this.props;
		onSelect(asset.symbol);
		onClose();
		e.stopPropagation();
	};

	onStarClicked = e => {
		const { asset, onToggleWatchlistItem } = this.props;
		onToggleWatchlistItem(asset);
		e.stopPropagation();
	};

	render() {
		const { asset, selected } = this.props;
		const { isOpen, isInWatchlist } = asset;
		const classes = classnames('asset-picker-item', selected);

		return (
			<tr
				className={classes}
				onClick={this.onRowClicked}
			>
				<td
					onClick={this.onStarClicked}
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
		);
	}
}
