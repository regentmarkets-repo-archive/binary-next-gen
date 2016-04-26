import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as LiveData from '../_data/LiveData';
import SelectGroup from '../_common/SelectGroup';
import languages from '../_constants/languages';

@connect(state => ({ selected: state.boot.get('language') }))
export default class LanguagePicker extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        actions: PropTypes.object.isRequired,
        selected: PropTypes.oneOf(languages.map(ln => ln.value)),
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: 'EN',
    };

    updateLanguage(event) {
        const { actions } = this.props;
        actions.updateBoot('language', event.target.value);
        LiveData.changeLanguage(event.target.value);
        actions.resubscribeAllPriceProposal();
    }

    render() {
        const { selected } = this.props;
        return (
            <SelectGroup
                {...this.props}
                options={languages}
                value={selected}
                onChange={::this.updateLanguage}
            />
        );
    }
}
