import React from 'react';
import { RadioItem, RadioGroup } from '../_common';
import { digitMatchOptions } from '../_constants/TradeParams';

export default class TradeTypeSelectorCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func,
		tickTrade: React.PropTypes.object.isRequired,
	};

	render() {
		const {actions, tickTrade} = this.props;
		const {tradeSelection} = tickTrade.get('tradeType');
		const onChangeTradeTypeChanged = e => {
			actions.updateTickTradeParameters({ tradeType: e.target.value });
			// this.getPrice();
			window.console.log(e.target.value);
		};
		window.console.log(tradeSelection);
		return (
			<div>
				<fieldset className="radio-selector">
					<RadioItem label="Rise" name="trade-type" value="CALL" img="img/trade-rise.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Fall" name="trade-type" value="PUT" img="img/trade-fall.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<fieldset className="radio-selector">
					<RadioItem label="Digit Match" name="trade-type" value="DIGITMATCH" img="img/trade-match.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Digit Differs" name="trade-type" value="DIGITDIFF" img="img/trade-differs.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<fieldset className="radio-selector">
					<RadioItem label="Digit Over" name="trade-type" value="DIGITOVER" img="img/trade-digitover.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Digit Under" name="trade-type" value="DIGITUNDER" img="img/trade-digitunder.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<fieldset className="radio-selector">
					<RadioItem label="Digit Even" name="trade-type" value="DIGITEVEN" img="img/trade-digiteven.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Digit Odd" name="trade-type" value="DIGITODD" img="img/trade-digitodd.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Last Digit Prediction</label><RadioGroup name="digit-match" options={digitMatchOptions} {...this.props}/>
				<fieldset className="radio-selector">
					<RadioItem label="Asian Up" name="trade-type" value="ASIANU" img="img/trade-asianup.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Asian Down" name="trade-type" value="ASIAND" img="img/trade-asiandown.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<fieldset className="radio-selector">
					<RadioItem label="Higher" name="trade-type" value="?1" img="img/trade-higher.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Lower" name="trade-type" value="?2" img="img/trade-lower.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
				<fieldset className="radio-selector">
					<RadioItem label="Touches" name="trade-type" value="ONETOUCH" img="img/trade-touch.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Does Not Touch" name="trade-type" value="NOTOUCH" img="img/trade-notouch.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Barrier offset</label><input type="number" defaultValue={123} />(123)
				<fieldset className="radio-selector">
					<RadioItem label="Ends Between" name="trade-type" value="EXPIRYRANGE" img="img/trade-between.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Ends Outside" name="trade-type" value="EXPIRYMISS" img="img/trade-outside.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
				<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
				<fieldset className="radio-selector">
					<RadioItem label="Stays Between" name="trade-type" value="RANGE" img="img/trade-in.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Goes Outside" name="trade-type" value="UPORDOWN" img="img/trade-out.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Low barrier offset</label><input type="number" defaultValue={123} />(123)
				<label>High barrier offset</label><input type="number" defaultValue={123} />(123)
				<fieldset className="radio-selector">
					<RadioItem label="Spread Long" name="trade-type" value="SPREADU" img="img/trade-spread.svg" onChange={onChangeTradeTypeChanged} />
					<RadioItem label="Spread Short" name="trade-type" value="SPREADD" img="img/trade-spread.svg" onChange={onChangeTradeTypeChanged} />
				</fieldset>
				<label>Amount per point</label>USD<input type="number" defaultValue={1} />
				<label>Stop-loss</label>points<input type="number" defaultValue={10} />
				<label>Stop-profit</label>points<input type="number" defaultValue={10} />
			</div>
		);
	}
}
