import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import allTexts from '../_constants/texts';
import locale from '../_constants/languageLocaleMap';
import { bootSelector } from '../_selectors/BootSelectors';
import localeData from './localeData';

const timeFormats = {
    full: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
        hour12: false,
    },
};

@connect(bootSelector)
export default class BootProvider extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        theme: PropTypes.string.isRequired,
    };
    componentWillReceiveProps(nextProps) {
        const { language } = nextProps;
        addLocaleData(localeData(locale(language)));
    }
    render() {
        const { children, language, theme } = this.props;
        return (
            <IntlProvider
                locale={locale(language)}
                messages={allTexts(language)}
                formats={{ time: timeFormats }}
            >
                <div id="theme-wrapper" className={(theme === 'dark') ? 'inverse' : ''}>
                    {Children.only(children)}
                </div>
            </IntlProvider>
        );
    }
}
