import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../common';
import TickSparkline from '../watchlist/TickSparkline';

const testHistory = [
	{quote: 10}, {quote: 50}, {quote: 20}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 30}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 60}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 20}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 40}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 40}, {quote: 50},
];

export default (workspace) => (
	<div>
		<fieldset>
			<TickSparkline width={344} height={120} history={testHistory} />
		</fieldset>
		<div className="row">
			<label>Underlying Asset</label>
			<fieldset style={{flex: 2}}>
				<Link to={'/asset-selector'} className="button">USD/JPY {workspace.symbol}</Link>
			</fieldset>
		</div>
		<div className="row">
			<label>Select Trade</label>
			<fieldset style={{flex: 2}}>
				<button>U</button><button>D</button><button>=</button><button>!=</button>
			</fieldset>
		</div>
		<div className="row">
			<label>No. ticks:</label>
			<fieldset style={{flex: 2}}>
				<RangeGroup min={5} max={10} items={['5', '6', '7', '8', '9', '10']} />
			</fieldset>
		</div>
		<div className="row">
			<label>Select Amount</label>
			<fieldset style={{flex: 2}}>
				<button>Payout: USD 20</button>
			</fieldset>
		</div>
		<fieldset>
			<Link to={'/asset-selector'} className="button">a</Link> will <button>RISE</button> over next <button>5 ticks</button>
		</fieldset>
		<fieldset>
			<label>Price: USD 7.1</label>
			<br/>
			<button className="buy-btn">Place Order</button>
		</fieldset>
	</div>
);
