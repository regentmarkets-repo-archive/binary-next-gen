import React from 'react';

export default class RiseFallFilter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		const { minAvailableDuration, onCalculate } = this.props;

		return (
			<form name="rise_fall" id="rise_fall_form">
    			<div className="row">
			        <fieldset>
			            <label for="atleast">Start time:</label>
			            <select id="atleast" name="date_start" />
			        </fieldset>

			        <fieldset id="duration_container">
			            <label for="duration_amount">Duration:</label>
			            <input name="duration_amount" id="duration_amount" size="4" maxlength="5" value="5" type="text" />
			            <select name="duration_units">
			            	<option value="h" class="spot">hours</option>
							<option value="m" class="spot">minutes</option>
							<option value="s" class="spot">seconds</option>
							<option value="t" class="spot">ticks</option>
						</select>
	                    <span class="non_input">
							<abbr rel="tooltip" title="minimum available duration">min</abbr>: {minAvailableDuration}
						</span>
			        </fieldset>
			        <fieldset>
			            <label for="payout">Payout Currency:</label>
			            <select id="bet_currency" name="currency">
		                    <option value="USD">USD</option>
		                    <option value="EUR">EUR</option>
		                    <option value="GBP">GBP</option>
		                    <option value="AUD">AUD</option>
			            </select>
			        </fieldset>
			    </div>

			    <input name="table_action" value="price" type="hidden" />

			    <button onClick={onCalculate}>Calculate</button>
			</form>
		);
	}
}
