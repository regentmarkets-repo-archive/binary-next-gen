import React, { PropTypes } from 'react';
import M from '../_common/M';

const LabeledText = ({ id, label, value = 'N/A' }) => (
    <div id={id} className={'name-val-pair'}>
        <M className={'name'} id={label + ':'} m={label + ':'}/>
        <M className={'val'} id={value} m={value}/>
    </div>
);

LabeledText.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default LabeledText;
