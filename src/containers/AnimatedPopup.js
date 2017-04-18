import React, { PureComponent } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

export default class AnimatedPopup extends PureComponent {
    props: {
        shown: boolean,
        children: any,
    };

    render() {
        const { shown, children } = this.props;

        return (
            <TransitionGroup
                transitionName="popup"
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
            >
                {shown ? children : null}
            </TransitionGroup>
        );
    }
}
