import React, { Component } from 'react';
import WebHeader from './WebHeader';
import Footer from './Footer';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import RealityCheckContainer from '../reality-check/RealityCheckContainer';

export default class WebCard extends Component {

	render() {
		return (
			<div className="screen">
				<WebHeader />
				<WorkspaceContainer />
				<Footer />
				<RealityCheckContainer />
			</div>
		);
	}
}
