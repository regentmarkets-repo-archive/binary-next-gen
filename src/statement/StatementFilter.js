import React, { PropTypes, Component } from 'react';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';

export default class StatementFilter extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		transactionsFilter: PropTypes.number.isRequired,
	};

	onFilterChange = idx =>
		this.props.actions.updateTransactionsFilter(idx);

	render() {
		const { transactionsFilter } = this.props;

		return (
			<TabList
				activeIndex={transactionsFilter}
				onChange={this.onFilterChange}
			>
				<Tab text="Today" />
				<Tab text="Yesterday" />
				<Tab text="Last 7 Days" />
				<Tab text="Last 30 Days" />
			</TabList>
		);
	}
}
