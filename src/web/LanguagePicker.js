import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SelectGroup } from 'binary-components';
import storage from '../_store/storage';

@connect(state => ({ selected: state.boot.get('language') }))
@connect(state => ({ languages: state.account.get('languages') }))
export default class LanguagePicker extends PureComponent {

    props: {
        selected: string,
        languages: any[],
    };

    static defaultProps = {
        selected: 'EN',
        languages: [{
            value: 'EN',
            text: 'English',
        }],
    };

    changeLanguage = event => {
        window.BinaryBoot.language = event.target.value;
        storage.setItem('boot', JSON.stringify(window.BinaryBoot));
        window.location.reload();
    }

    render() {
        const { selected, languages } = this.props;
        if (languages) {
            console.log(languages);
        }

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
