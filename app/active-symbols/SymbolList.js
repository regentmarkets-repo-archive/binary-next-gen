import React from 'react';
import ObjectTable from '../offerings/ObjectTable';

export default class SymbolList extends React.Component {

	static propTypes = {
		symbols: React.PropTypes.object
	};

	render() {

		const symbols = this.props.symbols;

		return (
			<div>
				{ Object.keys(symbols).map((s, i) =>
					<ObjectTable key={i} object={symbols[s]} />
				)}
			</div>
		);
	}
}
