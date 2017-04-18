import React, { PureComponent } from 'react';
import WebHeader from './WebHeader';
import Footer from './Footer';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import RealityCheckContainer from '../reality-check/RealityCheckContainer';

export default class WebCard extends PureComponent {
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
