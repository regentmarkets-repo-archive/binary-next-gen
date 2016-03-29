import digitOptions from './digitOptions';

export default type => {
	switch (type) {
		case 'DIGITOVER': {
			return digitOptions(0, 9);
		}
		case 'DIGITUNDER': {
			return digitOptions(1, 10);
		}
		default: {
			return digitOptions(0, 10);
		}
	}
};
