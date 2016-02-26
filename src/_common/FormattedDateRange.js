import React, { PropTypes, Component } from 'react';
import { FormattedDate } from 'react-intl';

export default class FormattedDateRange extends Component {

	static propTypes = {
		fromDate: PropTypes.instanceOf(Date),
		toDate: PropTypes.instanceOf(Date),
	};

	render() {
		const { fromDate, toDate } = this.props;

		return (
			<span>
				<FormattedDate value={fromDate} /> – <FormattedDate value={toDate} />
			</span>
		);
	}
}
