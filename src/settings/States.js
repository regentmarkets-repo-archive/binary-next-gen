import React, { PureComponent, PropTypes } from 'react';

export default class States extends PureComponent {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        states: PropTypes.array.isRequired,
        selected: PropTypes.string,
        id: PropTypes.string,
        noLabel: PropTypes.bool,
    };

    render() {
        const { states, onChange, id, selected, noLabel } = this.props;

        return (
            <fieldset>
                {noLabel ? null : <label htmlFor={id}>State/Province</label>}
                <select id={id} onChange={onChange} value={selected}>
                    {states.map((x, i) => (
                        <option key={i} value={x.value}>{x.text}</option>
                    ))}
                </select>
            </fieldset>
        );
    }
}
