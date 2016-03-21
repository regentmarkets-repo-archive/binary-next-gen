import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import allTexts from '../_constants/texts';
import locale from '../_constants/languageLocaleMap';
import { appConfigSelector } from '../_selectors/AppConfigSelectors';
import localeData from './localeData';

const timeFormats = {
    full: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },
};

@connect(appConfigSelector)
export default class AppConfigProvider extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        theme: PropTypes.string.isRequired,
    };
    render() {
        const { children, language, theme } = this.props;
        addLocaleData(localeData(locale(language)));
        return (
            <IntlProvider locale={locale(language)} messages={allTexts(language)} formats={{ time: timeFormats }}>
                <div id="theme-wrapper" className={(theme === 'dark') ? 'inverse' : ''}>
                    {Children.only(children)}
                </div>
            </IntlProvider>
        );
    }
}
