import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SymbolList from './SymbolList';

@connect(state => ({ assets: state.assets }))
export default class ActiveSymbolsCard extends React.Component {

	static propTypes = {
		assets: PropTypes.object.isRequired,
	};

	render() {
		const activeSymbols = this.props.assets.toJS().active;
		return (
			<SymbolList symbols={activeSymbols} />
		);
	}
}
