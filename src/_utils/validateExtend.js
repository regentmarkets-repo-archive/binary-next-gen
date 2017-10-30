import validate from 'validate.js/validate.min';
import moment from 'moment';

// Contents of this file needs to be run once to add
// our custom validators and extensions

validate.options = {
	fullMessages: false,
	cleanAttributes: false
};

validate.extend(validate.validators.datetime, {
	parse: (v) => +moment.utc(v),
	format: (v) => moment.utc(v).format('YYYY-MM-DD'),
});

const REQ_TXT = 'This field is required.';
const VALID_NUM_WARN = 'Should be a valid number.';

validate.validators.presence.message = REQ_TXT;
validate.validators.numericality.notInteger = VALID_NUM_WARN;
validate.validators.numericality.notValid = VALID_NUM_WARN;

/* eslint-disable consistent-return */

// pass in the value that must not be blank in options
validate.validators.presenceRequiredBy = (value, options, key, attributes) => {
	const msg = REQ_TXT;
	if (typeof options === 'string') {
		const requiredBy = attributes[options];
		const myself = attributes[key];
		if (requiredBy && !myself) {
			return msg;
		}
	}
};

validate.validators.condition = (value, options, key, attributes) => {
	const { func, message } = options;
	if (!!value && func(value, attributes)) {
		return message;
	}
};

/* eslint-enable consistent-return */
