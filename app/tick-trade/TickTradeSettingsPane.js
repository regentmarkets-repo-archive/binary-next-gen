import React from 'react';

export default (props) => (
	<div>
		<label>Underlying</label>
		<fieldset>
			<button>Forex</button><button>Randoms</button>
		</fieldset>
		<label>USD/JPY</label>
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
