import React from 'react';
import M from '../_common/M';

export default () => (
	<fieldset>
		<label>
			Days to display
			<input type="number" size="3" defaultValue="30" />
		</label>
		<button>
			<M m="View" />
		</button>
	</fieldset>
);
