export const tradeTypes = [
	{ value: 'CALL', text: 'Rise', img: '/public/img/img/trade-higher.svg', ticks: true },
	{ value: 'PUT', text: 'Fall', img: '/public/img/trade-lower.svg', ticks: true },
	{ value: 'DIGITMATCH', text: 'Digit Match', img: '/public/img/trade-match.svg', ticks: true },
	{ value: 'DIGITDIFF', text: 'Digit Differs', img: '/public/img/trade-differs.svg', tick: true },
	{ value: 'ASIANU', text: 'Asian Up', img: '/public/img/trade-asianup.svg', ticks: true },
	{ value: 'ASIAND', text: 'Asian Down', img: '/public/img/trade-asiandown.svg', ticks: true },
	{ value: 'EXPIRYRANGE', text: 'Ends Between', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'EXPIRYMISS', text: 'Ends Outside', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'RANGE', text: 'Stays Between', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'UPORDOWN', text: 'Goes Outside', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'ONETOUCH', text: 'Touches', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'NOTOUCH', text: 'Does Not Touch', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'SPREADU', text: 'Spread Long', img: '/public/img/trade-???.svg', ticks: false },
    { value: 'SPREADD', text: 'Spread Short', img: '/public/img/trade-???.svg', ticks: false },
];

export const digitMatchOptions = Array.from(Array(10).keys()).map(x => ({ value: x, text: x }));
