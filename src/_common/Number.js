import React, { Component, PropTypes } from 'react';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class Number extends Component {
    static propTypes = {
        value: PropTypes.any,
        currency: PropTypes.any,
        isProfit: PropTypes.func,
    };

    render() {
        const { isProfit } = this.props;
        return (
            isProfit ?
                <NumberColored {...this.props} /> :
                <NumberPlain {...this.props} />
        );
    }
}
