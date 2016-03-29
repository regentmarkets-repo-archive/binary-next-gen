export default ticks =>
    (ticks && ticks.length > 0) ? ticks[ticks.length - 1].quote : 0;
