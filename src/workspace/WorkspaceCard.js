import React, { PropTypes, Component } from 'react';
import Resizer from 'binary-components/lib/Resizer';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceSidePanel from './WorkspaceSidePanel';
import WorkspaceTabs from './WorkspaceTabs';
import ContractDetailsModal from './ContractDetailsModal';

export default class WorkspaceCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	onResize = e => {
		const { actions } = this.props;
		actions.changeWorkspacePanelSize('side', window.innerWidth - e.clientX - 92);
	}

	render() {
		const { actions, workspace } = this.props;
		const { sideActiveTab, tradeMode, sidePanelVisible } = workspace;

		return (
			<div className="panels">
				<ContractDetailsModal actions={actions} />
				<TradesContainer
					actions={actions}
					tradeMode={tradeMode}
				/>
				<Resizer
					className="resizer-vertical"
					onResize={this.onResize}
				/>
				{sidePanelVisible && <WorkspaceSidePanel actions={actions} {...workspace} />}
				<WorkspaceTabs actions={actions} activeTab={sideActiveTab} />
			</div>
		);
	}
}
