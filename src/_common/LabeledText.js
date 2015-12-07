import React from 'react';

const LabeledText = ({ id, label, value = 'N/A' }) => (
    <div id={id} className={'name-val-pair'}>
        <span className={'name'}>{`${label}: `}</span>
        <span className={'val'}>{value}</span>
    </div>
);

LabeledText.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
};

export default LabeledText;
