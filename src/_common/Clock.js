import React, { Component, PropTypes } from 'react';
import { FormattedTime, FormattedDate } from 'react-intl';
import M from '../_common/M';

export default class Clock extends Component {

    static propTypes = {
        time: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.state = {
            time: (new Date()).getTime(),
            serverDiff: 0,
        };
    }

    componentWillMount() {
        const { time } = this.props;
        const timeEpoch = (new Date()).getTime();
        const diff = ((time * 1000) - timeEpoch);

        this.setState({ serverDiff: diff });
    }

    componentDidMount() {

        this.interval = setInterval(() => this.setState({ time: (new Date()).getTime() }), 1000);

    }

    componentWillUnmount() {
		clearInterval(this.interval);
	}

    render() {
        const { time, serverDiff } = this.state;
        const newEpoch = time + serverDiff;
        const newtime = new Date(newEpoch).toISOString().replace(/T/, ' ').replace(/\..+/, '');

        return (
            <div>
                <M m={` ${newtime} GMT`} />

            </div>
        );
    }
}
