import React from 'react';

export default class MarketSearch extends React.Component {

	static propTypes = {
      	actions: React.PropTypes.object.isRequired
    };

    render() {

		const { actions } = this.props;

		return (
			<input type="search"
				placeholder="Search for markets"
				onChange={e => actions.filterMarkets(e.target.value)} />
		);
	}
}
