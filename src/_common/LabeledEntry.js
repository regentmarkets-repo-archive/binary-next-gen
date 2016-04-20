import React, { PropTypes, Component } from 'react';
import LabeledText from './LabeledText';
import LabeledNumber from './LabeledNumber';

export default class LabeledEntry extends Component {
    static defaultProps = {
        value: 'N/A',
    };

    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
        currency: PropTypes.any,
        isProfit: PropTypes.func,
    };

    render() {
        const { value } = this.props;

        return (
            isNaN(value) ?
                <LabeledText {...this.props} /> :
                <LabeledNumber {...this.props} />
        );
    }
}
