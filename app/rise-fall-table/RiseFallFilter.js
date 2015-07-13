import React from 'react';

export default class RiseFallFilter extends React.Component {

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
