export default value =>
    (value < 0 && 'number-negative') || (value > 0 && 'number-positive') || '';
