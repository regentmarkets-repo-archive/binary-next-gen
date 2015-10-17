import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../common';

export default () => (
	<div>
		<label>Underlying Asset</label>
		<fieldset>
			<Link to={'/asset-selector'} className="button">Forex > USD/JPY</Link>
		</fieldset>
		<label>Select Trade</label>
		<fieldset>
			<button>Up</button><button>Down</button><button>Digit Match</button><button>Digit Differs</button>
		</fieldset>
		<fieldset>
			<label>No. ticks:</label>
			<RangeGroup min={5} max={10} items={['5', '6', '7', '8', '9', '10']} />
		</fieldset>
		<label>Select Amount</label>
		<fieldset>
			<button>Payout</button><button>Stake</button>
		</fieldset>
		<label>USD</label><input type="number" defaultValue={15} />
		<fieldset>
			<button>Save</button>
		</fieldset>
	</div>
);
