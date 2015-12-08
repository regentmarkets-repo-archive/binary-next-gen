import React from 'react';
import { SelectGroup } from '../_common';
import languages from '../_constants/languages';
import * as LiveData from '../_data/LiveData';

export default class LanguagePicker {
    static propTypes = {
        selected: React.PropTypes.oneOf(languages.map(ln => ln.value)),
        actions: React.PropTypes.object,
    };

    updateLanguage(event) {
        this.props.actions.signinFieldUpdate('language', event.target.value);
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
