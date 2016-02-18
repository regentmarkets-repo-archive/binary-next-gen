import React, { PropTypes, Component } from 'react';
import Modal from './Modal';

const ModalSingleton = ({ component, shown }) => (
	<Modal shown={shown}>
		{component}
	</Modal>
);

Modal.propTypes = {
	shown: PropTypes.bool,
	component: PropTypes.any,
};

export default ModalSingleton;
