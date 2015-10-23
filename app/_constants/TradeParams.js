export const tradeTypes = [
	{ value: 'CALL', text: 'Rise', img: '/public/trade-higher.svg', ticks: true },
	{ value: 'PUT', text: 'Fall', img: '/public/trade-lower.svg', ticks: true },
	{ value: 'DIGITMATCH', text: 'Digit Match', img: '/public/trade-match.svg', ticks: true },
	{ value: 'DIGITDIFF', text: 'Digit Differs', img: '/public/trade-differs.svg', tick: true },
	{ value: 'ASIANU', text: 'Asian Up', img: '/public/trade-asianup.svg', ticks: true },
	{ value: 'ASIAND', text: 'Asian Down', img: '/public/trade-asiandown.svg', ticks: true },
	{ value: 'EXPIRYRANGE', text: 'Ends Between', img: '/public/trade-???.svg', ticks: false },
    { value: 'EXPIRYMISS', text: 'Ends Outside', img: '/public/trade-???.svg', ticks: false },
    { value: 'RANGE', text: 'Stays Between', img: '/public/trade-???.svg', ticks: false },
    { value: 'UPORDOWN', text: 'Goes Outside', img: '/public/trade-???.svg', ticks: false },
    { value: 'ONETOUCH', text: 'Touches', img: '/public/trade-???.svg', ticks: false },
    { value: 'NOTOUCH', text: 'Does Not Touch', img: '/public/trade-???.svg', ticks: false },
    { value: 'SPREADU', text: 'Spread Long', img: '/public/trade-???.svg', ticks: false },
    { value: 'SPREADD', text: 'Spread Short', img: '/public/trade-???.svg', ticks: false },
];

export const digitMatchOptions = Array.from(Array(10).keys()).map(x => ({ value: x, text: x }));
