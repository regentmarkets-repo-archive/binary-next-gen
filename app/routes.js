import App from './App';
import HomePage from './home/HomePage';
import LoginPane from './login/LoginPane';
import TickTradePane from './tick-trade/TickTradePane';
import SignupPane from './signup/SignupPane';
import UpgradePane from './upgrade/UpgradePane';
import TicksPane from './ticks/TicksPane';
import OfferingsPane from './offerings/OfferingsPane';
import ActiveSymbolsPane from './active-symbols/ActiveSymbolsPane';
import MarketsPane from './markets/MarketsPane';
import AssetIndexPane from './asset-index/AssetIndexPane';
import AssetIndexTable from './asset-index/AssetIndexTable';
import RiseFallTablePane from './rise-fall-table/RiseFallTablePane';
import TradingTimesPane from './trading-times/TradingTimesPane';
import TradingTimesTable from './trading-times/TradingTimesTable';
import PricingTablePane from './pricing-table/PricingTablePane';
import DailyPricesPane from './daily-prices/DailyPricesPane';
import IntradayPricesPane from './intraday-prices/IntradayPricesPane';
import PortfolioPane from './portfolio/PortfolioPane';
import StatementPane from './statement/StatementPane';
import TradePane from './trade/TradePane';
import SettingsPane from './settings/SettingsPane';
import SettingsPersonalDetails from './settings/SettingsPersonalDetails';
import SettingsSecurity from './settings/SettingsSecurity';
import SettingsSelfExclusion from './settings/SettingsSelfExclusion';
import SettingsLimits from './settings/SettingsLimits';

export default {
    component: App,
    childRoutes: [
        { path: '/', component: HomePage },
        { path: 'login', component: LoginPane },
        { path: 'tick-trade', component: TickTradePane },
        { path: 'signup', component: SignupPane },
        { path: 'upgrade', component: UpgradePane },
        { path: 'trade', component: TradePane },
        { path: 'ticks', component: TicksPane },
        { path: 'offerings', component: OfferingsPane },
        { path: 'active-symbols', component: ActiveSymbolsPane },
        { path: 'markets', component: MarketsPane },
        { path: 'asset-index', component: AssetIndexPane, childRoutes: [
            { path: ':market', component: AssetIndexTable },
        ]},
        { path: 'trading-times', component: TradingTimesPane, childRoutes: [
            { path: ':market', component: TradingTimesTable },
        ]},
        { path: 'rise-fall-table', component: RiseFallTablePane },
        { path: 'pricing-table', component: PricingTablePane },
        { path: 'daily-prices', component: DailyPricesPane },
        { path: 'intraday-prices', component: IntradayPricesPane },
        { path: 'portfolio', component: PortfolioPane },
        { path: 'statement', component: StatementPane },
        { component: SettingsPane, childRoutes: [
            { path: 'settings', component: SettingsPersonalDetails },
            { path: 'settings/security', component: SettingsSecurity },
            { path: 'settings/exclusion', component: SettingsSelfExclusion },
            { path: 'settings/limits', component: SettingsLimits },
        ]},
    ],
};
