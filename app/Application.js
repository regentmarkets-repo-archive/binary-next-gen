import React from 'react';
import { RouteHandler } from "react-router";

export default class Application extends React.Component {
	static getProps(stores, params) {
		var transition = stores.Router.getItem("transition");
		return {
			loading: !!transition
		};
	}
	render() {
		return (
			<div>
				<h1>Binary App</h1>
				<RouteHandler />
			</div>
		);
	}
}
