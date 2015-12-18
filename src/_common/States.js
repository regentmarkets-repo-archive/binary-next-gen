import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ states: state.states }))
export default class States extends React.Component {
    static propTypes = {
        country: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        states: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired,
    };

    render() {
        const { states, country, onChange } = this.props;
        const statesForCountry = states[country] || [{ value: 'none', text: 'Loading ...' }];
        return (
        <select id={country + 'states'} onChange={onChange}>
            <option value="">State/Province</option>
            {statesForCountry.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
        </select>
        );
    }
}
