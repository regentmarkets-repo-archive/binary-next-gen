import React from "react";
import { Link } from "react-router";
import { LiveData } from "store-helpers/LiveData";
import DateOfBirth from "../components/DateOfBirth";
import Countries from "../components/Countries";

export default class TradePage extends React.Component {

	static getInitialState() {
		LiveEvents.on('*', console.log);
	}

	static getProps() {
		return {};
	}

	render() {
		return (
	  		<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Epoc</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Yolo</td>
						<td>123</td>
						<td>456</td>
					</tr>
				</tbody>
		    </table>
		);
	}
}
