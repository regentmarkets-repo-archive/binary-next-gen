export const tradeTypes = [
	{ value: 'CALL', text: 'Rise', img: 'img/trade-rise.svg', ticks: true },
	{ value: 'PUT', text: 'Fall', img: 'img/trade-fall.svg', ticks: true },
	{ value: 'DIGITMATCH', text: 'Digit Match', img: 'img/trade-match.svg', ticks: true, barrier: true },
	{ value: 'DIGITDIFF', text: 'Digit Differs', img: 'img/trade-differs.svg', tick: true, barrier: true },
	{ value: 'DIGITOVER', text: 'Digit Over', img: 'img/trade-differs.svg', tick: true, barrier: true },
	{ value: 'DIGITUNDER', text: 'Digit Under', img: 'img/trade-differs.svg', tick: true, barrier: true },
	{ value: 'DIGITEVEN', text: 'Digit Even', img: 'img/trade-differs.svg', tick: true },
	{ value: 'DIGITODD', text: 'Digit Odd', img: 'img/trade-differs.svg', tick: true },
	{ value: 'ASIANU', text: 'Asian Up', img: 'img/trade-asianup.svg', ticks: true },
	{ value: 'ASIAND', text: 'Asian Down', img: 'img/trade-asiandown.svg', ticks: true },
	{ value: 'EXPIRYRANGE', text: 'Ends Between', img: 'img/trade-between.svg', ticks: false },
    { value: 'EXPIRYMISS', text: 'Ends Outside', img: 'img/trade-outside.svg', ticks: false },
    { value: 'RANGE', text: 'Stays Between', img: 'img/trade-in.svg', ticks: false },
    { value: 'UPORDOWN', text: 'Goes Outside', img: 'img/trade-out.svg', ticks: false },
    { value: 'ONETOUCH', text: 'Touches', img: 'img/trade-touch.svg', ticks: false },
    { value: 'NOTOUCH', text: 'Does Not Touch', img: 'img/trade-notouch.svg', ticks: false },
    { value: 'SPREADU', text: 'Spread Long', img: 'img/trade-spread.svg', ticks: false },
    { value: 'SPREADD', text: 'Spread Short', img: 'img/trade-spread.svg', ticks: false },
];

export const digitMatchOptions = Array.from(Array(10).keys()).map(x => ({ value: x, text: x.toString() }));
