import React, { PropTypes, Component } from 'react';
import RadioItem from '../_common/RadioItem';

const TradeTypeRestOptions = ({ onChange, type }) => (
	<div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'ASIANU'}
				label="Asian Up"
				name="trade-type"
				value="ASIANU"
				img="img/trade-asianu.svg"
				onChange={onChange}
			/>
			<RadioItem
				checked={type === 'ASIAND'}
				label="Asian Down"
				name="trade-type"
				value="ASIAND"
				img="img/trade-asiand.svg"
				onChange={onChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				label="Higher"
				name="trade-type"
				value="?1"
				img="img/trade-higher.svg"
				onChange={onChange}
			/>
			<RadioItem label="Lower" name="trade-type" value="?2" img="img/trade-lower.svg" onChange={onChange} />
		</div>
		<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
		<div className="radio-selector">
			<RadioItem
				label="Touches"
				name="trade-type"
				value="ONETOUCH"
				img="img/trade-onetouch.svg"
				onChange={onChange}
			/>
			<RadioItem
				label="Does Not Touch"
				name="trade-type"
				value="NOTOUCH"
				img="img/trade-notouch.svg"
				onChange={onChange}
			/>
		</div>
		<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
		<div className="radio-selector">
			<RadioItem
				label="Ends Between"
				name="trade-type"
				value="EXPIRYRANGE"
				img="img/trade-expiryrange.svg"
				onChange={onChange}
			/>
			<RadioItem
				label="Ends Outside"
				name="trade-type"
				value="EXPIRYMISS"
				img="img/trade-expirymiss.svg"
				onChange={onChange}
			/>
		</div>
		<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
		<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
		<div className="radio-selector">
			<RadioItem
				label="Stays Between"
				name="trade-type"
				value="RANGE"
				img="img/trade-range.svg"
				onChange={onChange}
			/>
			<RadioItem
				label="Goes Outside"
				name="trade-type"
				value="UPORDOWN"
				img="img/trade-upordown.svg"
				onChange={onChange}
			/>
		</div>
		<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
		<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
		<div className="radio-selector">
			<RadioItem
				label="Spread Long"
				name="trade-type"
				value="SPREADU"
				img="img/trade-spreadu.svg"
				onChange={onChange}
			/>
			<RadioItem
				label="Spread Short"
				name="trade-type"
				value="SPREADD"
				img="img/trade-spreadu.svg"
				onChange={onChange}
			/>
		</div>
		<label>Amount per point</label>USD<input type="number" defaultValue={1} />
		<label>Stop-loss</label>points<input type="number" defaultValue={10} />
		<label>Stop-profit</label>points<input type="number" defaultValue={10} />
	</div>
);

TradeTypeRestOptions.propTypes = {
	type: PropTypes.string,
	barrier: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onChange: PropTypes.func,
};
