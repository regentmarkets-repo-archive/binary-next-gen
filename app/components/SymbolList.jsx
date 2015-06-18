import React from "react";
import ObjectTable from "./ObjectTable";

export default class SymbolList extends React.Component {

	render() {

		let symbols = this.props.symbols;

		console.log('symbols', symbols);

		return (
			<div>
				{ Object.keys(symbols).map((s, i) =>
					<ObjectTable key={i} object={symbols[s]} />
				)}
			</div>
		);
	}
}
