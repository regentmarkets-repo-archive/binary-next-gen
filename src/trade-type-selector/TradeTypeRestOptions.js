import React from 'react';
import { RadioItem } from '../_common';

const TradeTypeSelectorCard = ({onChange}) => (
	<div>
		<fieldset className="radio-selector">
			<RadioItem label="Asian Up" name="trade-type" value="ASIANU" img="img/trade-asianup.svg" onChange={onChange} />
			<RadioItem label="Asian Down" name="trade-type" value="ASIAND" img="img/trade-asiandown.svg" onChange={onChange} />
		</fieldset>
		<fieldset className="radio-selector">
			<RadioItem label="Higher" name="trade-type" value="?1" img="img/trade-higher.svg" onChange={onChange} />
			<RadioItem label="Lower" name="trade-type" value="?2" img="img/trade-lower.svg" onChange={onChange} />
		</fieldset>
		<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
		<fieldset className="radio-selector">
			<RadioItem label="Touches" name="trade-type" value="ONETOUCH" img="img/trade-touch.svg" onChange={onChange} />
			<RadioItem label="Does Not Touch" name="trade-type" value="NOTOUCH" img="img/trade-notouch.svg" onChange={onChange} />
		</fieldset>
		<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
		<fieldset className="radio-selector">
			<RadioItem label="Ends Between" name="trade-type" value="EXPIRYRANGE" img="img/trade-between.svg" onChange={onChange} />
			<RadioItem label="Ends Outside" name="trade-type" value="EXPIRYMISS" img="img/trade-outside.svg" onChange={onChange} />
		</fieldset>
		<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
		<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
		<fieldset className="radio-selector">
			<RadioItem label="Stays Between" name="trade-type" value="RANGE" img="img/trade-in.svg" onChange={onChange} />
			<RadioItem label="Goes Outside" name="trade-type" value="UPORDOWN" img="img/trade-out.svg" onChange={onChange} />
		</fieldset>
		<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
		<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
		<fieldset className="radio-selector">
			<RadioItem label="Spread Long" name="trade-type" value="SPREADU" img="img/trade-spread.svg" onChange={onChange} />
			<RadioItem label="Spread Short" name="trade-type" value="SPREADD" img="img/trade-spread.svg" onChange={onChange} />
		</fieldset>
		<label>Amount per point</label>USD<input type="number" defaultValue={1} />
		<label>Stop-loss</label>points<input type="number" defaultValue={10} />
		<label>Stop-profit</label>points<input type="number" defaultValue={10} />
	</div>
);

TradeTypeSelectorCard.propTypes = {
	onChange: React.PropTypes.func,
};
