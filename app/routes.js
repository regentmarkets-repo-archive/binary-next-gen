import App from './App';
import HomePage from './home/HomePage';
import NavigationMenu from './navigation/NavigationMenu';
import LoginPage from './login/LoginPage';
import TickTradePage from './tick-trade/TickTradePage';
import TickTradePane from './tick-trade/TickTradePane';
import TickTradeInPane from './tick-trade/TickTradeInPane';
import TickTradeSettingsPane from './tick-trade/TickTradeSettingsPane';
import { PortfolioPage, PortfolioPopup } from './portfolio';
import StatementPage from './statement/StatementPage';
import SignupPane from './signup/SignupPane';
import UpgradePane from './upgrade/UpgradePane';
import TicksPane from './ticks/TicksPane';
import OfferingsPane from './offerings/OfferingsPane';
import ActiveSymbolsPane from './active-symbols/ActiveSymbolsPane';
import AssetSelectorPage from './asset-selector/AssetSelectorPage';
import AssetIndexPane from './asset-index/AssetIndexPane';
import AssetIndexTable from './asset-index/AssetIndexTable';
import RiseFallTablePane from './rise-fall-table/RiseFallTablePane';
import TradingTimesPane from './trading-times/TradingTimesPane';
import TradingTimesTable from './trading-times/TradingTimesTable';
import PricingTablePane from './pricing-table/PricingTablePane';
import DailyPricesPane from './daily-prices/DailyPricesPane';
import IntradayPricesPane from './intraday-prices/IntradayPricesPane';
import ProfitTablePane from './profit-table/ProfitTablePane';
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
        { path: 'nav', component: NavigationMenu },
        { path: 'login', component: LoginPage },
        { path: 'tick-trade', indexRoute: { component: TickTradePane }, component: TickTradePage, childRoutes: [
            { path: 'in', component: TickTradeInPane },
            { path: 'settings', component: TickTradeSettingsPane },
        ]},
        { path: 'portfolio', component: PortfolioPage },
        { path: 'portfolio-popup', component: PortfolioPopup },
        { path: 'statement', component: StatementPage },
        { path: 'signup', component: SignupPane },
        { path: 'upgrade', component: UpgradePane },
        { path: 'trade', component: TradePane },
        { path: 'ticks', component: TicksPane },
        { path: 'offerings', component: OfferingsPane },
        { path: 'active-symbols', component: ActiveSymbolsPane },
        { path: 'asset-selector/:market', component: AssetSelectorPage },
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
        { path: 'profit-table', component: ProfitTablePane },
        { path: 'settings', indexRoute: { component: SettingsPersonalDetails }, component: SettingsPane, childRoutes: [
            { path: 'security', component: SettingsSecurity },
            { path: 'exclusion', component: SettingsSelfExclusion },
            { path: 'limits', component: SettingsLimits },
        ]},
    ],
};
