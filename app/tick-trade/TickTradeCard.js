import React from 'react';
import { Link } from 'react-router';
import TickSparkline from '../watchlist/TickSparkline';

export default (props) => (
	<div>
		<Link to={`/tick-trade/settings`} className="button">Change Time Settings</Link>
		<fieldset>
			<label>USD/JPY will RISE over next 5 ticks</label>
		</fieldset>
		<TickSparkline width={320} height={200} />
		<fieldset>
			<label>Payout: USD</label><input type="number" defaultValue={15} /> <button>+</button><button>-</button>
		</fieldset>
		<fieldset>
			<label>Price: USD 7.1</label><button>Buy!</button>
		</fieldset>
	</div>
);
