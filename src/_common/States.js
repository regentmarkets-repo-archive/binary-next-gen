import React from 'react';
import { connect } from 'react-redux';
import { getStatesForCountry } from '../_actions/StatesActions';

@connect(state => ({ states: state.states }))
export default class States extends React.Component {
    static propTypes = {
        country: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        states: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        id: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        props.dispatch(getStatesForCountry(props.country));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.country !== nextProps.country) {
            this.props.dispatch(getStatesForCountry(nextProps.country));
        }
    }

    render() {
        const { states, country, onChange, id } = this.props;
        const statesForCountry = states.get(country) || [{ value: 'none', text: 'Loading ...' }];
        return (
        <select id={id} onChange={onChange}>
            <option value="">State/Province</option>
            {statesForCountry.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
        </select>
        );
    }
}
