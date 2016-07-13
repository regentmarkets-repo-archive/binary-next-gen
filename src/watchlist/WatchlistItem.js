import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Direction from 'binary-components/lib/Direction';
import CloseButton from 'binary-components/lib/CloseButton';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import { actions } from '../_store';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistItem extends Component {

	static propTypes = {
		item: PropTypes.any.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

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
					<NumberPlain value={item.get('quote')} />&nbsp;
					<div>
						<Direction diff={item.get('diff')} />&nbsp;
						<NumberColored value={item.get('diff')} />
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
