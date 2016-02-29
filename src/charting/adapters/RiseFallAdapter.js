export const ticksToDataArray = history => history.map(h => [h.epoch, h.quote]);
export const openContractsToContracts = contracts => contracts.map(c => ({
    id: c.contract_id,
    entry: [c.entry_tick_time, c.entry_tick],
    exit: [c.exit_tick_time, c.exit_tick],
}));
