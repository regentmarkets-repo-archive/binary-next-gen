import React from 'react';
import { Link } from 'react-router';

export default (props) => (
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
			<button>5</button><button>6</button><button>7</button><button>8</button><button>9</button><button>10</button>
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
