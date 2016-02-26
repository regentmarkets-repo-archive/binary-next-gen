import React, { PropTypes, Component } from 'react';
import M from './M';

export default class TextAreaGroup extends Component {

    static propTypes = {
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

    render() {
        const { id, className, label, hint, value, readOnly, placeholder, onChange, rows, cols } = this.props;

        return (
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
                        cols={cols}
                    />
                {hint && <p className="hint">{hint}</p>}
            </fieldset>
        );
    }
}
