import React from 'react';
import { connect } from 'react-redux';
import SymbolList from './SymbolList';

@connect(state => ({ activeSymbols: state.serverData.activeSymbols }))
export default class ActiveSymbolsPage extends React.Component {

	static propTypes = {
		activeSymbols: React.PropTypes.array.isRequired,
	};

	render() {
		const { activeSymbols } = this.props;
		return (
			<SymbolList symbols={activeSymbols} />
		);
	}
}
