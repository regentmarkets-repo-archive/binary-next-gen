import React from 'react';
import { RadioItem, RadioGroup } from '../_common';
import { digitMatchOptions } from '../_constants/TradeParams';

const typesWithBarriers = [
	'DIGITMATCH',
	'DIGITDIFF',
	'DIGITOVER',
	'DIGITUNDER',
];
const typeHasBarrier = type => ~typesWithBarriers.indexOf(type);

const TradeTypeTickOptions = ({onTypeChange, onBarrierChange, type, barrier}) => (
	<div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'CALL'}
				label="Rise"
				name="trade-type"
				value="CALL"
				img="img/trade-rise.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'PUT'}
				label="Fall"
				name="trade-type"
				value="PUT"
				img="img/trade-fall.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITEVEN'}
				label="Digit Even"
				name="trade-type"
				value="DIGITEVEN"
				img="img/trade-digiteven.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITODD'}
				label="Digit Odd"
				name="trade-type"
				value="DIGITODD"
				img="img/trade-digitodd.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITMATCH'}
				label="Digit Match"
				name="trade-type"
				value="DIGITMATCH"
				img="img/trade-match.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITDIFF'}
				label="Digit Differs"
				name="trade-type"
				value="DIGITDIFF"
				img="img/trade-differs.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITOVER'}
				label="Digit Over"
				name="trade-type"
				value="DIGITOVER"
				img="img/trade-digitover.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITUNDER'}
				label="Digit Under"
				name="trade-type"
				value="DIGITUNDER"
				img="img/trade-digitunder.svg"
				onChange={onTypeChange}
			/>
		</div>
		{!!typeHasBarrier(type) &&
			<RadioGroup
				label="Last Digit Prediction"
				name="digit-match-differ"
				options={digitMatchOptions}
				onChange={onBarrierChange}
				value={barrier}
			/>
		}
	</div>
);

TradeTypeTickOptions.propTypes = {
	type: React.PropTypes.string,
	barrier: React.PropTypes.number,
	onTypeChange: React.PropTypes.func,
	onBarrierChange: React.PropTypes.func,
};

export default TradeTypeTickOptions;
