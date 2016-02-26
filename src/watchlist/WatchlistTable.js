import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		watchlistView: PropTypes.array.isRequired,
		selectedAsset: PropTypes.array.isRequired,
	};

	componentDidMount() {
		const focusedNode = findDOMNode(this.refs.focused);
		if (focusedNode) focusedNode.focus();
    }

	render() {
		const { actions, watchlistView, selectedAsset } = this.props;

		return (
			<table>
				<WatchlistTableHeader />
				<tbody>
					{watchlistView.map(x =>
						<WatchlistRow
							key={x.symbol}
							{...x}
							selected={selectedAsset === x.symbol}
							ref={selectedAsset === x.symbol ? 'focused' : null}
							onSelect={symbol => actions.changeSelectedAsset(symbol)}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
