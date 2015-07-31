import React from 'react';
import { TransitionSpring, presets } from 'react-motion';

export default class Modal {

	static propTypes = {
        shown: React.PropTypes.bool,
		onClose: React.PropTypes.func
    };

	renderModal(anim) {

		const { shown, onClose, children } = this.props;

		return (
			<div className="full-screen-overlay" onClick={onClose} style={{ opacity: anim.opacity.val }}>
				<div className="modal" style={{ transform: `scale(${anim.scale.val})` }}>
					<button onClick={onClose}>X</button>
					{children}
				</div>
			</div>
		);
	}

	getEndValue() {

		const { shown } = this.props;

		if (!shown) return {};

		return {
			modal: {
				scale: { val: 1, config: [1500, 40] },
				opacity: { val: 1, config: [1000, 40] }
			}
		};
	}

	willEnter() {

	    return {
			scale: { val: .75 },
			opacity: { val: .5 }
		}
	}

	willLeave(key, value, endValue, currentValue, currentSpeed) {

		return {
			scale: { val: 0, config: [1000, 40] },
			opacity: { val: 0, config: [1000, 40] }
		}
	}

	render() {

		const { shown, onClose } = this.props;

		return (
			<TransitionSpring endValue={::this.getEndValue} willEnter={::this.willEnter} willLeave={::this.willLeave}>
				{currentValue =>
	            	<div>
						{Object.keys(currentValue).map(key =>
  							this.renderModal(currentValue[key])
						)}
					</div>
				}
			</TransitionSpring>
		);
	}
}
