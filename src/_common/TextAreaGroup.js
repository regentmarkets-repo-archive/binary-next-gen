import React, { PropTypes } from 'react';

const TextAreaGroup = ({ id, className, label, hint, value, readOnly, placeholder, onChange, rows, cols }) => (
    <fieldset>
        {label && <label htmlFor={id}>{label}</label>}
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
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextAreaGroup;
