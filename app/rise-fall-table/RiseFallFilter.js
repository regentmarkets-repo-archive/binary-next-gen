import React from 'react';

const RiseFallFilter = ({minAvailableDuration, onCalculate}) => (
	<form name="rise_fall" id="rise_fall_form">
		<div className="row">
	        <fieldset>
	            <label htmlFor="atleast">Start time:</label>
	            <select id="atleast" name="date_start">
					<option>Now</option>
				</select>
	        </fieldset>

	        <fieldset id="duration_container">
	            <label htmlFor="duration_amount">Duration:</label>
			<input type="number" name="duration_amount" id="duration_amount" size="4" maxLength="5" defaultValue="5"  />
	            <select name="duration_units">
	            	<option value="h">hours</option>
					<option value="m">minutes</option>
					<option value="s">seconds</option>
					<option value="t">ticks</option>
				</select>
                <span className="non_input">
					<abbr rel="tooltip" title="minimum available duration">min</abbr>: {minAvailableDuration}
				</span>
	        </fieldset>
	        <fieldset>
	            <label htmlFor="payout">Payout Currency:</label>
	            <select id="bet_currency" name="currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AUD">AUD</option>
	            </select>
	        </fieldset>
	    </div>

	    <input type="range" defaultValue={50} min={0} max={100} step={10} />

	    <button onClick={onCalculate}>Calculate</button>
	</form>
);

RiseFallFilter.propTypes = {
	minAvailableDuration: React.PropTypes.number,
	onCalculate: React.PropTypes.func,
};

export default RiseFallFilter;
