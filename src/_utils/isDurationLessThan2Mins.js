import isDurationTick from './isDurationTick';
import durationToSecs from './durationToSecs';

export default (duration, durationUnit) =>
    isDurationTick(durationUnit) || durationToSecs(duration, durationUnit) < 120;
