import React from 'react';

export default class DailyPricesFilter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	static propTypes = {
		minAvailableDuration: React.PropTypes.number,
		onCalculate: React.PropTypes.func.isRequired
	};

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
