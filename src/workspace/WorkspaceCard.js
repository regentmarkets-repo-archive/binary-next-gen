import React, { PureComponent } from 'react';
import { Resizer } from 'binary-components';
import { actions } from '../_store';
import TradesLayout from '../trade/browser/TradesLayout';
import WorkspaceSidePanel from './WorkspaceSidePanel';
import WorkspaceTabs from './WorkspaceTabs';
import ContractDetailsModal from './ContractDetailsModal';

export default class WorkspaceCard extends PureComponent {
    props: {
        workspace: object,
    };

    onResize = (e: SyntheticEvent) =>
        actions.changeWorkspacePanelSize(
            'side',
            window.innerWidth - e.clientX - 92,
        );

    render() {
        const { workspace } = this.props;
        const { sideActiveTab } = workspace;

        return (
            <div className="panels">
                <ContractDetailsModal />
                <TradesLayout />
                <Resizer
                    className="resizer-vertical"
                    onResize={this.onResize}
                />
                <WorkspaceSidePanel {...workspace} />
                <WorkspaceTabs activeTab={sideActiveTab} />
            </div>
        );
    }
}
