import React from 'react';
import { Route } from 'react-router';

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
import DailyPricesPage from './daily-prices/DailyPricesPage';
import IntradayPricesPage from './intraday-prices/IntradayPricesPage';
import PortfolioPage from './portfolio/PortfolioPage';
import TradePage from './trade/TradePage';
import SettingsPage from './settings/SettingsPage';


class NotFound extends React.Component {
    render() {
        return <h1>Not found</h1>;
    }
}

export default (
    <Route component={App}>
        <Route path="/" component={HomePage}/>
		<Route path="login" component={LoginPage} />
		<Route path="signup" component={SignupPage} />
        <Route path="trade" component={TradePage} />
		<Route path="ticks" component={TicksPage} />
		<Route path="offerings" component={OfferingsPage} />
		<Route path="active-symbols" component={ActiveSymbolsPage} />
		<Route path="markets" component={MarketsPage} />
		<Route path="asset-index" component={AssetIndexPage} />
		<Route path="rise-fall-table" component={RiseFallTablePage} />
		<Route path="trading-times" component={TradingTimesPage} />
		<Route path="pricing-table" component={PricingTablePage} />
        <Route path="daily-prices" component={DailyPricesPage} />
        <Route path="intraday-prices" component={IntradayPricesPage} />
        <Route path="portfolio" component={PortfolioPage} />
        <Route path="settings" component={SettingsPage} />
    </Route>
);
