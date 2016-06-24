import React, { Component, PropTypes } from 'react';

export default class States extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        states: PropTypes.object.isRequired,
        selected: PropTypes.string,
        id: PropTypes.string,
    };


    render() {
        const { states, onChange, id, selected } = this.props;

        return (
            <fieldset>
                <label forHtml={id}>State/Province</label>
                <select id={id} onChange={onChange} value={selected}>
                    {states.map((x, i) => (
                        <option key={i} value={x.value}>{x.text}</option>
                    ))}
                </select>
            </fieldset>
        );
    }
}
