import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as LiveData from '../_data/LiveData';
import SelectGroup from '../_common/SelectGroup';
import languages from '../_constants/languages';
import { updateAppConfig } from '../_actions/AppConfigActions';
import Perf from 'react-addons-perf';

@connect(state => ({ selected: state.appConfig.get('language') }))
export default class LanguagePicker extends Component {

    static propTypes = {
        selected: PropTypes.oneOf(languages.map(ln => ln.value)),
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: 'EN',
    };

    updateLanguage(event) {
        this.props.dispatch(updateAppConfig('language', event.target.value));
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
