import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SelectGroup } from 'binary-components';
import storage from '../_store/storage';
import languages from '../_constants/languages';

@connect(state => ({ selected: state.boot.get('language') }))
export default class LanguagePicker extends PureComponent {
    props: {
        selected: string,
    };

    static defaultProps = {
        selected: 'EN',
    };

    changeLanguage = event => {
        window.BinaryBoot.language = event.target.value;
        storage.setItem('boot', JSON.stringify(window.BinaryBoot));
        window.location.reload();
    };

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
