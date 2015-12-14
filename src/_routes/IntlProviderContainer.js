import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import allTexts from '../_constants/texts';
import locale from '../_constants/languageLocaleMap';

@connect(state => ({ language: state.settings.get('language') }))
export default class IntlProviderContainer extends React.Component {
    static propTypes = {
        language: PropTypes.string.isRequired,
        children: PropTypes.object,
    };

    render() {
        const { language } = this.props;
        return (
            <IntlProvider locale={locale(language)} messages={allTexts(language)}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
