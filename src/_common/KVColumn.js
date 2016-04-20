import React, { Component, PropTypes } from 'react';
import M from 'M';
import Number from 'Number';

export default class KVColumn extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
        isProfit: PropTypes.func,
        currency: PropTypes.any,
    };

    render() {
        const { label, value } = this.props;
        return (
            <div>
                <M m={label} />
                {
                    isNaN(value) ?
                        <M m={value} /> :
                        <Number {...this.props} />
                }
            </div>
        );
    }
}
