import App from './App';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import UpgradePage from './upgrade/UpgradePage';
import TicksPage from './ticks/TicksPage';
import OfferingsPage from './offerings/OfferingsPage';
import ActiveSymbolsPage from './active-symbols/ActiveSymbolsPage';
import MarketsPage from './markets/MarketsPage';
import AssetIndexPage from './asset-index/AssetIndexPage';
import AssetIndexTable from './asset-index/AssetIndexTable';
import RiseFallTablePage from './rise-fall-table/RiseFallTablePage';
import TradingTimesPage from './trading-times/TradingTimesPage';
import TradingTimesTable from './trading-times/TradingTimesTable';
import PricingTablePage from './pricing-table/PricingTablePage';
import DailyPricesPage from './daily-prices/DailyPricesPage';
import IntradayPricesPage from './intraday-prices/IntradayPricesPage';
import PortfolioPage from './portfolio/PortfolioPage';
import StatementPage from './statement/StatementPage';
import TradePage from './trade/TradePage';
import SettingsPage from './settings/SettingsPage';
import SettingsPersonalDetails from './settings/SettingsPersonalDetails';
import SettingsSecurity from './settings/SettingsSecurity';
import SettingsSelfExclusion from './settings/SettingsSelfExclusion';
import SettingsLimits from './settings/SettingsLimits';

export default {
    component: App,
    childRoutes: [
        { path: '/', component: HomePage },
        { path: 'login', component: LoginPage },
        { path: 'signup', component: SignupPage },
        { path: 'upgrade', component: UpgradePage },
        { path: 'trade', component: TradePage },
        { path: 'ticks', component: TicksPage },
        { path: 'offerings', component: OfferingsPage },
        { path: 'active-symbols', component: ActiveSymbolsPage },
        { path: 'markets', component: MarketsPage },
        { path: 'asset-index', component: AssetIndexPage, childRoutes: [
            { path: ':market', component: AssetIndexTable },
        ]},
        { path: 'trading-times', component: TradingTimesPage, childRoutes: [
            { path: ':market', component: TradingTimesTable },
        ]},
        { path: 'rise-fall-table', component: RiseFallTablePage },
        { path: 'pricing-table', component: PricingTablePage },
        { path: 'daily-prices', component: DailyPricesPage },
        { path: 'intraday-prices', component: IntradayPricesPage },
        { path: 'portfolio', component: PortfolioPage },
        { path: 'statement', component: StatementPage },
        { component: SettingsPage, childRoutes: [
            { path: 'settings', component: SettingsPersonalDetails },
            { path: 'settings/security', component: SettingsSecurity },
            { path: 'settings/exclusion', component: SettingsSelfExclusion },
            { path: 'settings/limits', component: SettingsLimits },
        ]},
    ],
};
