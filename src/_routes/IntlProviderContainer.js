import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import allTexts from '../_constants/texts';

@connect(state => ({ language: state.signin.get('language') }))
export default class IntlProviderContainer extends React.Component {
    static propTypes = {
        language: React.PropTypes.string.isRequired,
        children: React.PropTypes.object,
    };

    render() {
        const { language } = this.props;

        return (
            <IntlProvider locale={language} messages={allTexts[language]}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
