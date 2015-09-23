import React from 'react';
import { connect } from 'react-redux';
import SymbolList from './SymbolList';

@connect(state => ({ markets: state.markets }))
export default class ActiveSymbolsPane extends React.Component {

	static propTypes = {
		markets: React.PropTypes.object.isRequired,
	};

	render() {
		const activeSymbols = this.props.markets.toJS().active;
		return (
			<SymbolList symbols={activeSymbols} />
		);
	}
}
