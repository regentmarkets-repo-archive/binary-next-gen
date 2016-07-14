import React, { PropTypes, PureComponent } from 'react';
import Direction from 'binary-components/lib/Direction';
import CloseButton from 'binary-components/lib/CloseButton';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import { actions } from '../_store';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistRow extends PureComponent {

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
			<tr>
				<td className="row-id">
					{item.get('assetName')}
				</td>
				<td className="numeric">
					<NumberPlain value={item.get('quote')} />
				</td>
				<td className="numeric">
					<Direction diff={item.get('diff')} /> <NumberColored value={item.get('diff')} />
				</td>
				<td className="centered">
					{item.get('isOpen') ?
						<WatchlistSparkline history={item.get('history')} /> :
						<OpenCloseNotice isOpen={false} />
					}
				</td>
				<td className="watchlist-remove-cell">
					<CloseButton onClick={this.onRemove} />
				</td>
			</tr>
		);
	}
}
