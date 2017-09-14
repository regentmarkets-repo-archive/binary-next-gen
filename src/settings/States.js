import React, { PureComponent } from 'react';

export default class States extends PureComponent {

    props: {
        states: any[],
        selected: string,
        id: string,
        noLabel: boolean,
        onChange: (e: SyntheticEvent) => void,
    };

    render() {
        const { states, onChange, id, selected, noLabel } = this.props;

        return (
            <fieldset>
                {noLabel ? null : <label htmlFor={id}>State/Province</label>}
                <select id={id} onChange={onChange} value={selected}>
                    {states && states.map((x, i) => (
                        <option key={i} value={x.value}>{x.text}</option>
                    ))}
                </select>
            </fieldset>
        );
    }
}
