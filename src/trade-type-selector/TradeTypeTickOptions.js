import React from 'react';
import { RadioItem, RadioGroup } from '../_common';
import { digitMatchOptions } from '../_constants/TradeParams';

const TradeTypeTickOptions = ({onTypeChange, onBarrierChange}) => (
	<div>
		<fieldset className="radio-selector">
			<RadioItem
				label="Rise"
				name="trade-type"
				value="CALL"
				img="img/trade-rise.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				label="Fall"
				name="trade-type"
				value="PUT"
				img="img/trade-fall.svg"
				onChange={onTypeChange}
			/>
		</fieldset>
		<fieldset className="radio-selector">
			<RadioItem
				label="Digit Even"
				name="trade-type"
				value="DIGITEVEN"
				img="img/trade-digiteven.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				label="Digit Odd"
				name="trade-type"
				value="DIGITODD"
				img="img/trade-digitodd.svg"
				onChange={onTypeChange}
			/>
		</fieldset>
		<fieldset className="radio-selector">
			<RadioItem
				label="Digit Match"
				name="trade-type"
				value="DIGITMATCH"
				img="img/trade-match.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				label="Digit Differs"
				name="trade-type"
				value="DIGITDIFF"
				img="img/trade-differs.svg"
				onChange={onTypeChange}
			/>
		</fieldset>
		<fieldset className="radio-selector">
			<RadioItem
				label="Digit Over"
				name="trade-type"
				value="DIGITOVER"
				img="img/trade-digitover.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				label="Digit Under"
				name="trade-type"
				value="DIGITUNDER"
				img="img/trade-digitunder.svg"
				onChange={onTypeChange}
			/>
		</fieldset>
		<RadioGroup
			label="Last Digit Prediction"
			name="digit-match-differ"
			options={digitMatchOptions}
			onChange={onBarrierChange}
		/>
	</div>
);

TradeTypeTickOptions.propTypes = {
	onChange: React.PropTypes.func,
};

export default TradeTypeTickOptions;
