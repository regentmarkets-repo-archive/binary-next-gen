import React, { PropTypes } from 'react';

const LabeledText = ({ id, label, value = 'N/A' }) => (
    <div id={id} className={'name-val-pair'}>
        <span className={'name'}>{`${label}: `}</span>
        <span className={'val'}>{value}</span>
    </div>
);

LabeledText.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default LabeledText;
