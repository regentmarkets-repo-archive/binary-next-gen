import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import SelectGroup from 'binary-components/lib/SelectGroup';
import languages from '../_constants/languages';

@connect(state => ({ selected: state.boot.get('language') }))
export default class LanguagePicker extends PureComponent {

    static propTypes = {
        selected: PropTypes.oneOf(languages.map(ln => ln.value)),
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: 'EN',
    };

    changeLanguage = event => {
        window.BinaryBoot.language = event.target.value;
        localStorage.setItem('boot', JSON.stringify(window.BinaryBoot));
        window.location.reload();
    }

    render() {
        const { selected } = this.props;
        return (
            <SelectGroup
                {...this.props}
                className="language-picker"
                options={languages}
                value={selected}
                onChange={this.changeLanguage}
            />
        );
    }
}
