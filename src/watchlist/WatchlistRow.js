import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Direction from 'binary-components/lib/Direction';
import CloseButton from 'binary-components/lib/CloseButton';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistRow extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		item: PropTypes.any.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onRemove = () => {
		const { actions, item } = this.props;
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
