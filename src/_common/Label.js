import React from 'react';
import TranslatedComponent from './TranslatedComponent';

export default (props) =>
	<TranslatedComponent
		renderer={
			message =>
				message => <label {...props}>{message}</label>
		}
	/>;
