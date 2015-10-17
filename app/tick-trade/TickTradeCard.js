import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../common';
import TickSparkline from '../watchlist/TickSparkline';

export default (workspace) => (
	<div>
		<div className="row">
			<label>Underlying Asset</label>
			<fieldset style={{flex: 2}}>
				<Link to={'/asset-selector'} className="button">USD/JPY</Link>
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
		<TickSparkline width={320} height={200} />
		<fieldset>
			<label>Price: USD 7.1</label>
			<br/>
			<button>Buy</button>
		</fieldset>
	</div>
);
