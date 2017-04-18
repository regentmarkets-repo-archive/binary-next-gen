import { nowAsEpoch } from 'binary-utils';

export default dateStart => dateStart - nowAsEpoch() > 5 * 60; // arbritarily chosen buffer
