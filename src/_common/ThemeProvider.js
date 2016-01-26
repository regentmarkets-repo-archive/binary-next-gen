import React, { Children } from 'react';
import { connect } from 'react-redux';

@connect(state => ({ theme: state.settings.get('theme') }))
export default class ThemeProvider extends React.Component {
    static propTypes = {
        theme: React.PropTypes.string,
        children: React.PropTypes.object,
    };

    render() {
        const theme = this.props.theme;
        return <div id="theme-wrapper" className={(theme === 'dark') ? 'inverse' : ''}>{Children.only(this.props.children)}</div>;
    }
}
