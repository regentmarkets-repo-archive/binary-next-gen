import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class LabeledText extends Component {

    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
    };

    render() {
        const { id, label, value = 'N/A' } = this.props;

        return (
            <div id={id} className={'name-val-pair'}>
                <M className={'name'} id={label + ':'} m={label + ':'} />
                <M className={'val'} id={value} m={value} />
            </div>
        );
    }
}
