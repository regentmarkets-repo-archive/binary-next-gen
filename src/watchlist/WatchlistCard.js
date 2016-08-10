import React, { PropTypes, PureComponent } from 'react';
import EmptySlate from '../containers/EmptySlate';
import WatchlistItem from './WatchlistItem';
import AnimatedPopup from '../containers/AnimatedPopup';

export default class WatchlistCard extends PureComponent {

	static propTypes = {
		watchlistView: PropTypes.object.isRequired,
	};

	render() {
		const { watchlistView } = this.props;
		return (
			watchlistView.size === 0 ?
				<EmptySlate
					img="img/watchlist.svg"
					text="You have no assets in watchlist"
				/> :
				<div className="watchlist-card">
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
