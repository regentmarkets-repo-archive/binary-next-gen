import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class ErrorMsg extends Component {

	static propTypes = {
		shown: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired,
	};
    constructor(props) {
        super(props);
        this.state = {
            shown: props.shown,
            text: props.text,
        };
    }
    componentWillReceiveProps(nextProps) {
        const { text, shown } = nextProps;
        const strText = text.split(')').length > 1 ? text.split(')')[1] : text;
        this.setState({
            shown,
            text: strText,
        });
    }

	render() {
		const { shown, text } = this.state;
		return shown ? <p className="errorfield"><M m={text} /></p> : <span />;
	}
}
