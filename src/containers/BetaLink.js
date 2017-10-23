import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class BetaLink extends PureComponent {

	props: {
		to: string,
		children: any,
	};

	render() {
        let l = this.props.to;
        if (window.BinaryBoot.isBeta) {
            l = '/beta' + l;
        }
        /* eslint-disable jsx-a11y/anchor-has-content */
        return <Link {...this.props} to={l} />;
        /* eslint-enable jsx-a11y/anchor-has-content */
	}
}
