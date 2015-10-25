import React from 'react';

export default class Star extends React.Component {

    static propTypes = {
		on: React.PropTypes.bool.isRequired,
		onClick: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.on !== this.props.on;
	}

    render() {
        const {on, onClick} = this.props;

        return (
            <span onClick={onClick} style={{ fontSize: '1.5rem' }}>
                {on ? '★' : '☆'}
            </span>
        );
    }
}
