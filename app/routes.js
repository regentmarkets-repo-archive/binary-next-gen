import App from './App';
import HomePage from './home/HomePage';
import NavigationMenu from './navigation/NavigationMenu';
import LoginPage from './login/LoginPage';
import TickTradePage from './tick-trade/TickTradePage';
import TickTradePane from './tick-trade/TickTradePane';
import TickTradeInPane from './tick-trade/TickTradeInPane';
import TickTradeSettingsPane from './tick-trade/TickTradeSettingsPane';
import { PortfolioPage, PortfolioMobile, PortfolioPopup } from './portfolio';
import { StatementPage, StatementMobile } from './statement';
import SignupPage from './signup/SignupPage';
import BalancesPage from './balances/BalancesPage';
import UpgradePage from './upgrade/UpgradePage';
import TicksPane from './ticks/TicksPane';
import OfferingsPane from './offerings/OfferingsPane';
import ActiveSymbolsPane from './active-symbols/ActiveSymbolsPane';
import AssetSelectorPage from './asset-selector/AssetSelectorPage';
import AssetIndexPane from './asset-index/AssetIndexPane';
import AssetIndexTable from './asset-index/AssetIndexTable';
import RiseFallTablePage from './rise-fall-table/RiseFallTablePage';
import TradingTimesPane from './trading-times/TradingTimesPane';
import TradingTimesTable from './trading-times/TradingTimesTable';
import PricingTablePage from './pricing-table/PricingTablePage';
import DailyPricesPage from './daily-prices/DailyPricesPage';
import IntradayPricesPane from './intraday-prices/IntradayPricesPane';
import ProfitTablePane from './profit-table/ProfitTablePane';
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
        { path: 'nav', component: NavigationMenu },
        { path: 'login', component: LoginPage },
        { path: 'tick-trade', indexRoute: { component: TickTradePane }, component: TickTradePage, childRoutes: [
            { path: 'in', component: TickTradeInPane },
            { path: 'settings', component: TickTradeSettingsPane },
        ]},
        { path: 'portfolio', component: PortfolioPage },
        { path: 'portfolio-mobile', component: PortfolioMobile },
        { path: 'portfolio-popup', component: PortfolioPopup },
        { path: 'statement', component: StatementPage },
        { path: 'statement-mobile', component: StatementMobile },
        { path: 'balances', component: BalancesPage },
        { path: 'signup', component: SignupPage },
        { path: 'upgrade', component: UpgradePage },
        { path: 'trade', component: TradePage },
        { path: 'ticks', component: TicksPane },
        { path: 'offerings', component: OfferingsPane },
        { path: 'active-symbols', component: ActiveSymbolsPane },
        { path: 'asset-selector', component: AssetSelectorPage },
        { path: 'asset-selector/:market', component: AssetSelectorPage },
        { path: 'asset-index', component: AssetIndexPane, childRoutes: [
            { path: ':market', component: AssetIndexTable },
        ]},
        { path: 'trading-times', component: TradingTimesPane, childRoutes: [
            { path: ':market', component: TradingTimesTable },
        ]},
        { path: 'rise-fall-table', component: RiseFallTablePage },
        { path: 'pricing-table', component: PricingTablePage },
        { path: 'daily-prices', component: DailyPricesPage },
        { path: 'intraday-prices', component: IntradayPricesPane },
        { path: 'profit-table', component: ProfitTablePane },
        { path: 'settings', indexRoute: { component: SettingsPersonalDetails }, component: SettingsPage, childRoutes: [
            { path: 'security', component: SettingsSecurity },
            { path: 'exclusion', component: SettingsSelfExclusion },
            { path: 'limits', component: SettingsLimits },
        ]},
    ],
};
