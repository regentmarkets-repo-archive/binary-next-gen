import React, { PropTypes } from 'react';
import { SelectGroup } from '../_common';
import languages from '../_constants/languages';
import * as LiveData from '../_data/LiveData';
import { connect } from 'react-redux';
import { updateSettingFields } from '../_actions/SettingsActions';
import Perf from 'react-addons-perf';

@connect(state => ({ selected: state.settings.get('language') }))
export default class LanguagePicker extends React.Component {
    static propTypes = {
        selected: PropTypes.oneOf(languages.map(ln => ln.value)),
        dispatch: PropTypes.func.isRequired,
    };

    updateLanguage(event) {
        this.props.dispatch(updateSettingFields({ language: event.target.value }));
        LiveData.changeLanguage(event.target.value);
        Perf.start();
        setTimeout(() => {
            Perf.stop();
            const measurements = Perf.getLastMeasurements();
            Perf.printInclusive(measurements);
            Perf.printWasted(measurements);
        }, 10000);
    }

    render() {
        const { selected } = this.props;
        return (
            <SelectGroup
                options={languages}
                value={selected}
                onChange={::this.updateLanguage}
                {...this.props}
            />
        );
    }
}

LanguagePicker.defaultProps = {
    selected: 'EN',
};
