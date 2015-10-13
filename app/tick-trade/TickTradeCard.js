import React from 'react';
import { Link } from 'react-router';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default (props) => (
	<div>
		<Link to={`/tick-trade/settings`} className="button">Change Time Settings</Link>
		<fieldset>
			<label>USD/JPY will RISE over next 5 ticks</label>
		</fieldset>
		<Sparklines>
			<SparklinesLine width={320} height={200} />
		</Sparklines>
		<fieldset>
			<label>Payout: USD</label><input type="number" defaultValue={15} /> <button>+</button><button>-</button>
		</fieldset>
		<fieldset>
			<label>Price: USD 7.1</label><button>Buy!</button>
		</fieldset>
	</div>
);
