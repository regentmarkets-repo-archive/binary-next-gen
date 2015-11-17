import React from 'react';
import { Panel } from '../_common';
import StatementContainer from './StatementContainer';

export default (props) => (
	<Panel title="Statement" position={props.position}>
		<StatementContainer {...props} />
	</Panel>
);
