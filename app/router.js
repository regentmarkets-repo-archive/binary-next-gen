import React from 'react';
import { history } from 'react-router/lib/HashHistory';
import { Router, Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './App';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import TicksPage from './ticks/TicksPage';
import OfferingsPage from './offerings/OfferingsPage';
import ActiveSymbolsPage from './active-symbols/ActiveSymbolsPage';
import MarketsPage from './markets/MarketsPage';
import AssetIndexPage from './asset-index/AssetIndexPage';
import RiseFallTablePage from './rise-fall-table/RiseFallTablePage';
import TradingTimesPage from './trading-times/TradingTimesPage';
import PricingTablePage from './pricing-table/PricingTablePage';


class NotFound extends React.Component {
    render() {
        return <h1>Not found</h1>;
    }
}

module.exports = (
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="home" component={HomePage}/>
    		<Route path="/login" component={LoginPage} />
    		<Route path="/signup" component={SignupPage} />
    		<Route path="/ticks" component={TicksPage} />
    		<Route path="/offerings" component={OfferingsPage} />
    		<Route path="/active-symbols" component={ActiveSymbolsPage} />
    		<Route path="/markets" component={MarketsPage} />
    		<Route path="/asset-index" component={AssetIndexPage} />
    		<Route path="/rise-fall-table" component={RiseFallTablePage} />
    		<Route path="/trading-times" component={TradingTimesPage} />
    		<Route path="/pricing-table" component={PricingTablePage} />
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);
