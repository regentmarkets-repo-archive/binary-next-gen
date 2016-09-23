import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { M } from 'binary-components';
import { trackEvent } from 'binary-utils/lib/Analytics';
import storage from '../_store/storage';

@connect(state => ({ theme: state.boot.get('theme') }))
export default class ThemeSwitcher extends PureComponent {

	props: {
        theme: string,
    };

	toggleTheme = () => {
		const { theme } = this.props;
		window.BinaryBoot.theme = theme === 'light' ? 'dark' : 'light';
		storage.setItem('boot', JSON.stringify(window.BinaryBoot));
		trackEvent('Workspace', 'Theme', window.BinaryBoot.theme);
        window.location.reload();
	}

	render() {
		const { theme } = this.props;
		const themeText = theme === 'light' ? 'Dark Theme' : 'Light Theme';

		return (
			<a
				className="sidebar-btn"
				onClick={this.toggleTheme}
			>
				<img src="img/palette.svg" alt="" />
				<M m={themeText} />
			</a>
		);
	}
}
