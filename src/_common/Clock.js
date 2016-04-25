import React, { Component, PropTypes } from 'react';
import dateToGMTString from 'binary-utils/lib/dateToGMTString';

export default class Clock extends Component {

    static propTypes = {
        serverTimeDiff: PropTypes.number,
    };

    static defaultProps = {
        serverTimeDiff: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            time: Date.now(),
        };
    }

    componentDidMount() {
        this.interval = setInterval(() =>
            this.setState({ time: Date.now() }), 1000);
    }

    componentWillUnmount() {
		clearInterval(this.interval);
	}

    render() {
        const { time } = this.state;
        const { serverTimeDiff } = this.props;
        const displayTime = dateToGMTString(new Date(time + serverTimeDiff));

        return (
            <div>
                {displayTime} GMT
            </div>
        );
    }
}
