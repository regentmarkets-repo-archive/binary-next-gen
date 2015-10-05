import React from 'react';
import { connect } from 'react-redux';
import SymbolList from './SymbolList';

@connect(state => ({ assets: state.assets }))
export default class ActiveSymbolsPane extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
	};

	render() {
		const activeSymbols = this.props.assets.toJS().active;
		return (
			<SymbolList symbols={activeSymbols} />
		);
	}
}
