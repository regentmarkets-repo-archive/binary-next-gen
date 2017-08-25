import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Star from 'react-material-design-icons/icons/Star';
import StarBorder from 'react-material-design-icons/icons/StarBorder';
import { OpenCloseNotice } from 'binary-components';

export default class AssetPickerItem extends PureComponent {

	props: {
		asset: object,
		selected: boolean,
		onSelect: (asset: string) => void,
		onClose: () => void,
		onToggleWatchlistItem: (asset: object) => void,
	};

	static defaultProps = {
		asset: {},
		selected: false,
	};

  onRowClicked = (e: SyntheticEvent) => {
    const { asset, onClose, onSelect } = this.props;
    if (asset.isOpen) {
      onSelect(asset.symbol);
      onClose();
    }
    e.stopPropagation();
  };

	onStarClicked = (e: SyntheticEvent) => {
		const { asset, onToggleWatchlistItem } = this.props;
		onToggleWatchlistItem(asset);
		e.stopPropagation();
	};

	render() {
		const { asset, selected } = this.props;
		const { isOpen, isInWatchlist } = asset;
		const classes = classnames('asset-picker-item', { selected, closed: !isOpen });

		return (
			<tr
				className={classes}
				onClick={this.onRowClicked}
			>
				<td
					onClick={this.onStarClicked}
				>
					{isInWatchlist ? <Star /> : <StarBorder />}
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
