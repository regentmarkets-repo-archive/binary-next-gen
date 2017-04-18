export default (duration, durationUnit, options) =>
    !!options.find(
        x => durationUnit === x.unit && duration <= x.max && duration >= x.min,
    );
