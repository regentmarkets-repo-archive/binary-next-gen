import React from 'react';

export default class MarketSearch extends React.Component {

	static propTypes = {
		onChange: React.PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}

	render() {

		return (
			<input type="text" placeholder="Search for markets" onChange={::this.onChange} />
		);
	}
}
