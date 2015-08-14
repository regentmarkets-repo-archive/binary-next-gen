import React from 'react';

export default class DailyPricesFilter extends React.Component {

	static propTypes = {
        minAvailableDuration: React.PropTypes.number,
		onCalculate: React.PropTypes.func,
    };

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div>
				<label>
					Days to display
					<input type="number" size="3" defaultValue="30" />
				</label>
				<button>View</button>
			</div>
		);
	}
}
