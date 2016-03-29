// TODO: consider spread, then payout?
export default proposal =>
    +proposal.payout - +proposal.ask_price;
