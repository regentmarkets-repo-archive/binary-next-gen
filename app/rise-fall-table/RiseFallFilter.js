import React from 'react';
import { SelectGroup, DurationPicker } from '../common';

const RiseFallFilter = ({minAvailableDuration, onCalculate, currencies = ['USD']}) => (
	<form name="rise_fall" id="rise_fall_form">
		<div className="row">
	        <fieldset>
	            <label htmlFor="atleast">Start time:</label>
	            <select id="atleast" name="date_start">
					<option>Now</option>
				</select>
	        </fieldset>
			<DurationPicker minAvailableDuration={minAvailableDuration} />
			<SelectGroup label="Payout Currency" items={currencies.map(x => ({ value: x, text: x }))} value="USD" />
	    </div>
	    <button onClick={onCalculate}>Calculate</button>
	</form>
);

RiseFallFilter.propTypes = {
	minAvailableDuration: React.PropTypes.number,
	onCalculate: React.PropTypes.func,
};

export default RiseFallFilter;
