import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SelectGroup } from 'binary-components';
import storage from '../_store/storage';

@connect(state => ({ selected: state.boot.get('language') }))
@connect(state => ({ languages: state.websiteStatus.get('languages') }))
export default class LanguagePicker extends PureComponent {

    props: {
        selected: string,
        languages: any[],
    };

    static defaultProps = {
        selected: 'EN',
    };

    changeLanguage = event => {
        window.BinaryBoot.language = event.target.value;
        storage.setItem('boot', JSON.stringify(window.BinaryBoot));
        window.location.reload();
    }

    render() {
        const { selected } = this.props;
        const languages = Array.isArray(this.props.languages) ? this.props.languages : this.props.languages.toJS();

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
