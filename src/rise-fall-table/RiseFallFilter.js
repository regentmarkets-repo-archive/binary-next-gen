import React, { PropTypes } from 'react';
import { CurrencySelector, RangeGroup } from '../_common';

const RiseFallFilter = ({ onCalculate }) => (
	<form name="rise_fall" id="rise_fall_form">
		<div className="row">
			<fieldset>
				<label htmlFor="atleast">Start time</label>
				<br/>
				<select id="atleast" name="date_start">
					<option>Now</option>
				</select>
			</fieldset>
			<RangeGroup label="Measure" min={0} max={3} items={['Ticks', 'Seconds', 'Minutes', 'Hours']} />
			<RangeGroup label="Duration" min={5} max={10} items={['5', '6', '7', '8', '9', '10']} />
			<CurrencySelector value="USD" />
		</div>
		<button onClick={onCalculate}>Calculate</button>
	</form>
);

RiseFallFilter.propTypes = {
	minAvailableDuration: PropTypes.number,
	onCalculate: PropTypes.func,
};

export default RiseFallFilter;
