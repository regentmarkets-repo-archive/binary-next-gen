import React from 'react';

export default class DailyPricesFilter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		const { minAvailableDuration, onCalculate } = this.props;

		return (
				<form>
					<label>
						Days to display
						<input type="number" size="3" value="30" />
					</label>
					<button>View</button>
				</form>
		);
	}
}
