import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Star extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
		on: PropTypes.bool.isRequired,
	};

    render() {
        const { on } = this.props;

        return (
            <span style={{ fontSize: '1.5rem' }}>
                {on ? '★' : '☆'}
            </span>
        );
    }
}
