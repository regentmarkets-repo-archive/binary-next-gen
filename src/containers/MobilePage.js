import React, { PureComponent } from 'react';
import MobileToolbarFull from '../mobile/MobileToolbarFull';
import MobileToolbarBack from '../mobile/MobileToolbarBack';
import IosPadder from './IosPadder';

export default class MobilePage extends PureComponent {

	props: {
		backBtnBarTitle: string,
		children: any,
		toolbarShown: boolean,
		inverse: boolean,
		backTo: any,
	};

	static defaultProps = {
		toolbarShown: true,
	};

	render() {
		const { backBtnBarTitle, children, toolbarShown, inverse, backTo } = this.props;

		const isAndroidBrowser = /(android)/i.test(navigator.userAgent);
		// NOTE: A cordova app is also an android browser
		const isAndroidApp = window.cordova && device.platform === 'Android';
		const isAndroid = isAndroidApp || isAndroidBrowser;

		if (isAndroid) {
			// In android devices, there is a strange issue where the keyboard obstructs the input
			// fields. This hack places a blank space for the keyboard to occupy when it shows up.
			const inputsBlockedByKeyboard = ['tel', 'password', 'text', 'number', 'textarea'];
			const getAndroidKeyboardSpace = () => document.getElementById('android-keyboard-space');
			if (isAndroidApp) {
				window.addEventListener('native.keyboardshow', (e) => {
					getAndroidKeyboardSpace().style = 'height: ' + e.keyboardHeight + 'px;';
					document.activeElement.scrollIntoView();
				});

				window.addEventListener('native.keyboardhide', () => {
					getAndroidKeyboardSpace().removeAttribute('style');
				});
			} else if (isAndroidBrowser) {
				// In browser there is no API to know whether keyboard exists or get the keyboard height.
				// We have to figure it out from the screen and viewport height.
				const heightOffset = window.screen.height - window.outerHeight;
				const defaultWindowHeight = window.outerHeight;
				window.addEventListener('resize', () => {
					const isKeyboardExist =
						window.outerHeight < defaultWindowHeight // keyboard shrinks outerHeight when visible
						&& inputsBlockedByKeyboard.includes(document.activeElement.type);
					const androidKeyboardSpace = getAndroidKeyboardSpace();
					if (isKeyboardExist) {
						const keyboardHeight = window.screen.height - window.outerHeight - heightOffset;
						androidKeyboardSpace.style = 'height: ' + keyboardHeight + 'px;';
						document.activeElement.scrollIntoView();
					} else {
						androidKeyboardSpace.removeAttribute('style');
					}
				});
			} 
		}

		return (
			<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
				{toolbarShown ? <MobileToolbarFull /> : null}
				{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} to={backTo} /> : null}
				<div className="mobile-content">
					{children}
				</div>
				{isAndroid && <div id="android-keyboard-space" />}
				<IosPadder />
			</div>
		);
	}
}
