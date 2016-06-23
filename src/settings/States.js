import React, { Component, PropTypes } from 'react';

export default class States extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        country: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        states: PropTypes.object.isRequired,
        selected: PropTypes.string,
        id: PropTypes.string,
    };

    componentWillMount() {
        const { actions, country } = this.props;
        actions.getStatesForCountry(country);
    }

    render() {
        const { states, onChange, id, selected } = this.props;

        return (
            <fieldset>
            <label forHtml={id}>State/Province</label>
            <select id={id} onChange={onChange} value={selected}>
                {states.map(o => (
                    <option key={o.value} value={o.value}>{o.text}</option>
                ))}
            </select>
            </fieldset>
        );
    }
}
