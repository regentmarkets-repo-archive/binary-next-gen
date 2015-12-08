import React from 'react';
import { SelectGroup } from '../_common';
import languages from '../_constants/languages';
import * as LiveData from '../_data/LiveData';
import { connect } from 'react-redux';
import { signinFieldUpdate } from '../_actions/SigninActions';

@connect(state => ({ selected: state.signin.get('language') }))
export default class LanguagePicker extends React.Component {
    static propTypes = {
        selected: React.PropTypes.oneOf(languages.map(ln => ln.value)),
        dispatch: React.PropTypes.func.isRequired,
    };

    updateLanguage(event) {
        this.props.dispatch(signinFieldUpdate('language', event.target.value));
        LiveData.api.changeLanguage(event.target.value);
    }

    render() {
        const { selected } = this.props;
        return (
            <SelectGroup options={languages} value={selected} onChange={::this.updateLanguage} />
        );
    }
}

LanguagePicker.defaultProps = {
    selected: 'EN',
};
