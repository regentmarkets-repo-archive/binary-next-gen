import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({ states: state.states.toJS() }))
export default class States extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        country: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        states: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        selected: PropTypes.string,
        id: PropTypes.string,
    };

    componentWillMount() {
        const { actions, country } = this.props;
        actions.getStatesForCountry(country);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { actions, country } = this.props;
    //
    //     if (country !== nextProps.country) {
    //         actions.getStatesForCountry(country);
    //     }
    // }

    render() {
        // console.log(this.props);
        const { states, country, onChange, id, selected } = this.props;
        const statesForCountry = states.country || [{ value: 'none', text: 'Loading ...' }];

        return (
            <fieldset>
            <label forHtml={id}>State/Province</label>
            <select id={id} onChange={onChange} value={selected}>
                {statesForCountry.map(o => (
                    <option key={o.value} value={o.value}>{o.text}</option>
                ))}
            </select>
            </fieldset>
        );
    }
}
