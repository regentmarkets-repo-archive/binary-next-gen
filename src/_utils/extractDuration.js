import extractDurationHelper from './extractDurationHelper';

export default (contracts, type) => {
    const contractsOfType = contracts.filter(c => c.contract_type === type);
    // const forwardStartingDuration = contracts.filter(c => !!c.forward_starting_options);
    const nonForwardStartingContracts = contractsOfType.filter(c => !c.forward_starting_options);

    if (nonForwardStartingContracts.length === 0) {
        return undefined;
    }

    return extractDurationHelper(nonForwardStartingContracts, type);
};
