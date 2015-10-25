import HomePage from '../home/HomePage';
import WorkspacePage from '../workspace/WorkspacePage';
import SignupPage from '../signup/SignupPage';
import BalancesPage from '../balances/BalancesPage';
import UpgradePage from '../upgrade/UpgradePage';
import WatchlistPage from '../watchlist/WatchlistPage';
import OfferingsCard from '../offerings/OfferingsCard';
import ActiveSymbolsCard from '../active-symbols/ActiveSymbolsCard';
import AssetIndexPage from '../asset-index/AssetIndexPage';
import AssetIndexTable from '../asset-index/AssetIndexTable';
import RiseFallTablePage from '../rise-fall-table/RiseFallTablePage';
import TradingTimesPage from '../trading-times/TradingTimesPage';
import TradingTimesTable from '../trading-times/TradingTimesTable';
import PricingTablePage from '../pricing-table/PricingTablePage';
import DailyPricesPage from '../daily-prices/DailyPricesPage';
import IntradayPricesPane from '../intraday-prices/IntradayPricesPane';
import ProfitTablePage from '../profit-table/ProfitTablePage';
import PortfolioPage from '../portfolio/PortfolioPage';
import TradePage from '../trade/TradePage';
import SettingsPage from '../settings/SettingsPage';
import SettingsPersonalDetails from '../settings/SettingsPersonalDetails';
import SettingsSecurity from '../settings/SettingsSecurity';
import SettingsSelfExclusion from '../settings/SettingsSelfExclusion';
import SettingsLimits from '../settings/SettingsLimits';
import StatementPage from '../statement/StatementPage';

export default [
    { path: '/', component: HomePage },
    { path: 'portfolio', component: PortfolioPage },
    { path: 'statement', component: StatementPage },
    { path: 'workspace', component: WorkspacePage },
    { path: 'balances', component: BalancesPage },
    { path: 'signup', component: SignupPage },
    { path: 'upgrade', component: UpgradePage },
    { path: 'trade', component: TradePage },
    { path: 'watchlist', component: WatchlistPage },
    { path: 'offerings', component: OfferingsCard },
    { path: 'active-symbols', component: ActiveSymbolsCard },
    { path: 'asset-index', component: AssetIndexPage, childRoutes: [
        { path: ':market', component: AssetIndexTable },
    ]},
    { path: 'trading-times', component: TradingTimesPage, childRoutes: [
        { path: ':market', component: TradingTimesTable },
    ]},
    { path: 'rise-fall-table', component: RiseFallTablePage },
    { path: 'pricing-table', component: PricingTablePage },
    { path: 'daily-prices', component: DailyPricesPage },
    { path: 'intraday-prices', component: IntradayPricesPane },
    { path: 'profit-table', component: ProfitTablePage },
    { path: 'settings', indexRoute: { component: SettingsPersonalDetails }, component: SettingsPage, childRoutes: [
        { path: 'security', component: SettingsSecurity },
        { path: 'exclusion', component: SettingsSelfExclusion },
        { path: 'limits', component: SettingsLimits },
    ]},
];
