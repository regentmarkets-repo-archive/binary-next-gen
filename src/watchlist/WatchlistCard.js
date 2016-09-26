import React, { PureComponent } from 'react';
import EmptySlate from '../containers/EmptySlate';
import WatchlistItem from './WatchlistItem';
import AnimatedPopup from '../containers/AnimatedPopup';

export default class WatchlistCard extends PureComponent {

	props: {
		watchlistView: any[],
	};

	render() {
		const { watchlistView } = this.props;
		return (
			watchlistView.count() === 0 ?
				<EmptySlate
					img="img/watchlist.svg"
					text="You have no assets in your watchlist"
				/> :
				<div className="watchlist-card scrollable">
					<AnimatedPopup shown>
						{watchlistView.map(x =>
							<WatchlistItem
								key={x.get('symbol')}
								item={x}
								onSelect={this.onSelect}
							/>
						)}
					</AnimatedPopup>
				</div>
		);
	}
}
