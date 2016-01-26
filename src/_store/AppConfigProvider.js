import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import allTexts from '../_constants/texts';
import locale from '../_constants/languageLocaleMap';
import { appConfigSelector } from '../_selectors/AppConfigSelectors';

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
        return (
            <IntlProvider locale={locale(language)} messages={allTexts(language)} formats={{ time: timeFormats }}>
                <div id="theme-wrapper" className={(theme === 'dark') ? 'inverse' : ''}>
                    {Children.only(children)}
                </div>
            </IntlProvider>
        );
    }
}
