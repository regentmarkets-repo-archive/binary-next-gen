import React, { PropTypes } from 'react';
import WebHeader from './WebHeader';
import WorkspaceContainer from '../workspace/WorkspaceContainer';

export default class WewbCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="screen">
				<WebHeader actions={actions} />
				<WorkspaceContainer actions={actions} />
			</div>
		);
	}
}
