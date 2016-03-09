import React, { Component, PropTypes } from 'react';

export default class DobDay extends Component {

	static propTypes = {
		day: PropTypes.number.isRequired,
		onDayChange: PropTypes.func.isRequired,
	}

	render() {
		const { day, onDayChange } = this.props;
		const days = Array.apply(0, Array(31));

		return (
			<select id="dobdd" name="dobdd" defaultValue={day} onChange={onDayChange}>
				<option disabled>Day</option>
				{days.map((o, i) =>
					<option key={i} value={i + 1}>{i + 1}</option>
				)}
			</select>
		);
	}
}
