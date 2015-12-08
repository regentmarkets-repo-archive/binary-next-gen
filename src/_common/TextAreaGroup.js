import React from 'react';
import M from './M';

const TextAreaGroup = ({ id, className, label, hint, value, readOnly, placeholder, onChange, rows, cols }) => (
    <fieldset>
        {label && <label htmlFor={id}>
            <M m={label} />
        </label>}
            <textarea
                id={id}
                className={className}
                defaultValue={value}
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={onChange}
                rows={rows}
                cols={cols}>
            </textarea>
        {hint && <p className="hint">{hint}</p>}
    </fieldset>
);

TextAreaGroup.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    value: React.PropTypes.string,
    rows: React.PropTypes.number,
    cols: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
};

export default TextAreaGroup;
