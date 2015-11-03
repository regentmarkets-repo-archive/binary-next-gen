export const tradeTypes = [
	{ value: 'CALL', text: 'Rise', img: '/img/img/trade-higher.svg', ticks: true },
	{ value: 'PUT', text: 'Fall', img: '/img/trade-lower.svg', ticks: true },
	{ value: 'DIGITMATCH', text: 'Digit Match', img: '/img/trade-match.svg', ticks: true },
	{ value: 'DIGITDIFF', text: 'Digit Differs', img: '/img/trade-differs.svg', tick: true },
	{ value: 'ASIANU', text: 'Asian Up', img: '/img/trade-asianup.svg', ticks: true },
	{ value: 'ASIAND', text: 'Asian Down', img: '/img/trade-asiandown.svg', ticks: true },
	{ value: 'EXPIRYRANGE', text: 'Ends Between', img: '/img/trade-???.svg', ticks: false },
    { value: 'EXPIRYMISS', text: 'Ends Outside', img: '/img/trade-???.svg', ticks: false },
    { value: 'RANGE', text: 'Stays Between', img: '/img/trade-???.svg', ticks: false },
    { value: 'UPORDOWN', text: 'Goes Outside', img: '/img/trade-???.svg', ticks: false },
    { value: 'ONETOUCH', text: 'Touches', img: '/img/trade-???.svg', ticks: false },
    { value: 'NOTOUCH', text: 'Does Not Touch', img: '/img/trade-???.svg', ticks: false },
    { value: 'SPREADU', text: 'Spread Long', img: '/img/trade-???.svg', ticks: false },
    { value: 'SPREADD', text: 'Spread Short', img: '/img/trade-???.svg', ticks: false },
];

export const digitMatchOptions = Array.from(Array(10).keys()).map(x => ({ value: x, text: x }));
