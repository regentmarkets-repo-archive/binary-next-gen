import React from 'react';
import LabeledText from './LabeledText';

const LabeledTextList = ({id, textContents}) => (
    <table id={id} className={'borderless-table'}>
        <tbody>
            {textContents.map((content, idx) =>
                    <LabeledText
                        key={id + idx}
                        id={content.id}
                        label={content.label}
                        value={content.value}/>
            )}
        </tbody>
    </table>
);

LabeledTextList.propTypes = {
    id: React.PropTypes.string.isRequired,
    textContents: React.PropTypes.array.isRequired,
};

export default LabeledTextList;
