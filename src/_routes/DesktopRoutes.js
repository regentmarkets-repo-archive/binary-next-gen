import HomePage from '../home/HomePage';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import SignupPage from '../signup/SignupPage';
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
import VideoListContainer from '../video/VideoListContainer';
import NewsContainer from '../news/NewsContainer';
import ChartTest from '../charting/ChartTest';


import { requireAuthOnEnter } from '../_data/Auth';


export default [
    { path: 'home', component: HomePage },
    { path: 'portfolio', component: PortfolioPage, onEnter: requireAuthOnEnter },
    { path: 'statement', component: StatementPage, onEnter: requireAuthOnEnter },
    { path: 'workspace', component: WorkspaceContainer, onEnter: requireAuthOnEnter },
    { path: 'signup', component: SignupPage },
    { path: 'upgrade', component: UpgradePage },
    { path: 'trade', component: TradePage, onEnter: requireAuthOnEnter },
    { path: 'watchlist', component: WatchlistPage, onEnter: requireAuthOnEnter },
    { path: 'offerings', component: OfferingsCard, onEnter: requireAuthOnEnter },
    { path: 'active-symbols', component: ActiveSymbolsCard, onEnter: requireAuthOnEnter },
    { path: 'asset-index', component: AssetIndexPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: AssetIndexTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'trading-times', component: TradingTimesPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: TradingTimesTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'rise-fall-table', component: RiseFallTablePage, onEnter: requireAuthOnEnter },
    { path: 'pricing-table', component: PricingTablePage, onEnter: requireAuthOnEnter },
    { path: 'daily-prices', component: DailyPricesPage, onEnter: requireAuthOnEnter },
    { path: 'intraday-prices', component: IntradayPricesPane, onEnter: requireAuthOnEnter },
    { path: 'profit-table', component: ProfitTablePage, onEnter: requireAuthOnEnter },
    { path: 'settings', indexRoute: { component: SettingsPersonalDetails }, onEnter: requireAuthOnEnter, component: SettingsPage, childRoutes: [
        { path: 'security', component: SettingsSecurity },
        { path: 'exclusion', component: SettingsSelfExclusion },
        { path: 'limits', component: SettingsLimits },
    ] },
    { path: 'video', component: VideoListContainer },
    { path: 'news', component: NewsContainer },
    { path: 'chart', component: ChartTest },
];
