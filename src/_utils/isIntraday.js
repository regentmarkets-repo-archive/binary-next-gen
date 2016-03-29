import durationToSecs from './durationToSecs';

export default (duration, unit) =>
    durationToSecs(duration, unit) < 60 * 60 * 24;
