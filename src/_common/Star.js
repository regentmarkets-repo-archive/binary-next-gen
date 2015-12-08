import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Star extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
		on: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
	};

    render() {
        const { on, onClick } = this.props;

        return (
            <span onClick={onClick} style={{ fontSize: '1.5rem' }}>
                {on ? '★' : '☆'}
            </span>
        );
    }
}
