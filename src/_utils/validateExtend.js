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
