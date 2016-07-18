import React, { Children, PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingView from '../loading-view/InitAppLoadingView';
import { appStateSelector } from '../_selectors/AppStateSelectors';

/**
 * Note: The loading view is tightly coupled with the auto-signin flow of apps,
 * If we render children before connected === true, auto sign-in will fail
 */
@connect(appStateSelector)
export default class AppStateProvider extends PureComponent {

    static propTypes = {
        children: PropTypes.object.isRequired,
        connected: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this.timer = setTimeout(this.showMessageForSlowConnection, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    showMessageForSlowConnection = () => {
        this.setState({ showMessage: true });
    }

    render() {
        const { connected, children } = this.props;
        const showMessage = this.state && this.state.showMessage;
        const loadingView = <InitAppLoadingView showMessage={showMessage} />;

        return Children.only(connected ? children : loadingView);
    }
}
