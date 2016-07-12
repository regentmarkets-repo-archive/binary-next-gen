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
			<div>
				<div className="centered">
					{item.get('isOpen') ?
						<WatchlistSparkline history={item.get('history')} /> :
						<OpenCloseNotice isOpen={false} />
					}
				</div>
				<div className="watchlist-details">
					<div>
					{item.get('assetName')}
					</div>
					<div>
						<NumberPlain value={item.get('quote')} />&nbsp;
						<Direction diff={item.get('diff')} />&nbsp;
						<NumberColored value={item.get('diff')} />
					</div>
					<div className="watchlist-remove-cell">
						<CloseButton onClick={this.onRemove} />
					</div>
				</div>
			</div>
		);
	}
}
