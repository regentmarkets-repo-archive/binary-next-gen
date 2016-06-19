import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Direction from 'binary-components/lib/Direction';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import OpenCloseNotice from 'binary-components/lib/OpenCloseNotice';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistRow extends Component {

	static propTypes = {
		item: PropTypes.any.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { item } = this.props;

		return (
			<tr>
				<td className="row-id">
					{item.get('assetName')}
				</td>
				<td>
					<NumberPlain value={item.get('quote')} />
				</td>
				<td>
					<Direction diff={item.get('diff')} /> <NumberColored value={item.get('diff')} />
				</td>
				<td>
					{item.get('isOpen') ?
						<WatchlistSparkline history={item.get('history')} /> :
						<OpenCloseNotice isOpen={false} />
					}
				</td>
			</tr>
		);
	}
}
