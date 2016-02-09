import React, { PropTypes } from 'react';
import DesktopHeader from './DesktopHeader';
import WorkspaceContainer from '../workspace/WorkspaceContainer';

export default class WewbCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="screen">
				<DesktopHeader actions={actions} />
				<WorkspaceContainer actions={actions} />
			</div>
		);
	}
}
