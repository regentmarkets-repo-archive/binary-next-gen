import React, { PureComponent } from 'react';
import Clear from 'react-material-design-icons/icons/Clear';
import { Direction, NumberPlain, NumberColored, OpenCloseNotice } from 'binary-components';
import { actions } from '../_store';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistItem extends PureComponent {

	props: {
		item: any,
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
					<Clear className="close-btn" onClick={this.onRemove} />
				</div>
				{item.get('isOpen') ?
					<WatchlistSparkline history={item.get('history')} /> :
					<OpenCloseNotice isOpen={false} />
				}
			</div>
		);
	}
}
