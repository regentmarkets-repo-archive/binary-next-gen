import netProfitFromProposal from './netProfitFromProposal';
import askPriceFromProposal from './askPriceFromProposal';

export default proposal =>
    netProfitFromProposal(proposal) / askPriceFromProposal(proposal) * 100;
