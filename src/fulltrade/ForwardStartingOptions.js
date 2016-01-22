import React, { Component, PropTypes } from 'react';

/**
 * assumption: for each type of contract, there will only have 1 forward starting options contract
  */

export default class ForwardStartingOptions extends Component {
    static propTypes = {
        range: PropTypes.array.isRequired,
    };

    render() {
        const { range } = this.props;
        const msg = `You can choose from for ${range[0].date} to ${range[2].date}`;
        return (
            <div>
                {msg}
            </div>
        );
    }
}
