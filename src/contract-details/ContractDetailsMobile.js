import React from 'react';
import MobilePage from '../mobile/MobilePage';
import ContractDetailsContainer from './ContractDetailsContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Contract Details">
		<ContractDetailsContainer {...props} />
	</MobilePage>
);
