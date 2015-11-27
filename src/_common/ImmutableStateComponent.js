import React from 'react';

export default class ImmutableStateComponent extends React.Component {
    shouldComponent(nextProps, nextState) {
        return this.props !== nextProps ||
                this.state !== nextState;
    }
}
