import React, { PropTypes, PureComponent } from 'react';
import { Direction, CloseButton, NumberPlain, NumberColored, OpenCloseNotice } from 'binary-components';
import { actions } from '../_store';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistItem extends PureComponent {

	static propTypes = {
		item: PropTypes.any.isRequired,
	};

	onRemove = () => {
		const { item } = this.props;
		actions.watchlistToggleAsset(item.get('symbol'), false);
	}

	render() {
		const { item } = this.props;

		return (
			<div className="watchlist-item">
				<div className="watchlist-details">
					{item.get('assetName')}
					<NumberPlain value={item.get('quote')} digits={item.get('digits')} />
					&nbsp;
					<div>
						<Direction diff={item.get('diff')} />
						&nbsp;
						<NumberColored value={item.get('diff')} digits={item.get('digits')} />
					</div>
					<CloseButton onClick={this.onRemove} />
				</div>
				{item.get('isOpen') ?
					<WatchlistSparkline history={item.get('history')} /> :
					<OpenCloseNotice isOpen={false} />
				}
			</div>
		);
	}
}
