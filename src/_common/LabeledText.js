import React from 'react';

const LabeledText = ({id, label, value = 'N/A'}) => (
    <tr id={id} className={'name-val-pair'}>
        <td className={'name'}>{`${label}: `}</td>
        <td className={'val'}>{value}</td>
    </tr>
);

LabeledText.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
};

export default LabeledText;
