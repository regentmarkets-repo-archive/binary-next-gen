import React, { PureComponent } from 'react';
import { Button } from 'binary-components';
import {
    requestFullscreen,
    exitFullscreen,
    addFullscreenEventListener,
    removeFullscreenEventListener,
} from 'binary-utils';
import { trackEvent } from 'binary-utils/lib/Analytics';

export default class FullscreenSwitcher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false,
        };
    }

    componentWillMount() {
        addFullscreenEventListener(e => this.setState({ isFullscreen: e }));
    }

    componentWillUnmount() {
        removeFullscreenEventListener();
    }

    toggleFullscreenState = () => {
        const { isFullscreen } = this.state;
        this.setState({ isFullscreen: !isFullscreen });
        if (isFullscreen) {
            exitFullscreen();
        } else {
            requestFullscreen(document.getElementById('root'));
            trackEvent('Workspace', 'Fullscreen', isFullscreen);
        }
    };

    render() {
        const { isFullscreen } = this.state;
        return (
            <Button
                className="btn-secondary"
                onClick={this.toggleFullscreenState}
                text={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
            />
        );
    }
}
