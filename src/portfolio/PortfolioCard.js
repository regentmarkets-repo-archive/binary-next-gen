import React, { PureComponent } from 'react';
import { showError } from 'binary-utils';
import EmptySlate from '../containers/EmptySlate';
import { actions } from '../_store';
import PortfolioList from './PortfolioList';

export default class PortfolioCard extends PureComponent {
    props: {
        compact: boolean,
        contracts: Object,
        purchaseTotal: number,
        payoutTotal: number,
        indicativeTotal: number,
        onViewDetails: (contract: Contract) => void,
    };

    static contextTypes = {
        router: () => undefined,
    };

    onViewDetails = contract => {
        const { compact } = this.props;
        const { router } = this.context;

        actions
            .detailsForContract(contract.contract_id)
            .then(() => {
                if (compact) {
                    router.push({
                        pathname: '/contract',
                        query: { id: contract.contract_id },
                    });
                }
            })
            .catch(e => showError(e));
    };

    render() {
        const {
            compact,
            contracts,
            payoutTotal,
            purchaseTotal,
            indicativeTotal,
        } = this.props;

        if (Object.keys(contracts).length === 0) {
            return (
                <EmptySlate
                    img="img/portfolio.svg"
                    text="You have no open contracts"
                />
            );
        }

        return (
            <div className="portfolio-card">
                <PortfolioList
                    compact={compact}
                    contracts={contracts}
                    payoutTotal={payoutTotal}
                    purchaseTotal={purchaseTotal}
                    indicativeTotal={indicativeTotal}
                    onViewDetails={this.onViewDetails}
                />
            </div>
        );
    }
}
