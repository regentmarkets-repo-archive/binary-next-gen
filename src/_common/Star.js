import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Star extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
		on: PropTypes.bool,
	};

    render() {
        const { on } = this.props;
        const imgFile = on ? 'img/star-on.svg' : 'img/star-off.svg';
        return (
            <img
                style={{ minWidth: '1rem', width: '1rem' }}
                src={imgFile}
                role="presentation"
            />
        );
    }
}
