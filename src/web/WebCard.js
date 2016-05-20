import React, { PropTypes, Component } from 'react';
import WebHeader from './WebHeader';
import Footer from './Footer';
import WorkspaceContainer from '../workspace/WorkspaceContainer';

export default class WebCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="screen">
				<WebHeader actions={actions} />
				<WorkspaceContainer actions={actions} />
				<Footer actions={actions} />
			</div>
		);
	}
}
