import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import M from '../_common/M';

export default class LabeledDateTime extends Component {
    static defaultProps = {
        format: 'full',
    };

    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        epoch: PropTypes.number.isRequired,
        format: PropTypes.string,
    };

    render() {
        const { id, label, epoch, format } = this.props;

        return (
            <div id={id} className="name-val-pair">
                <M className={'name'} id={label + ':'} m={label + ':'} />
                <FormattedTime value={epoch * 1000} format={format} />
            </div>
        );
    }
}

