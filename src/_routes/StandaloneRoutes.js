import CreateAccountPage from '../create-account/CreateAccountPage';
import UpgradePage from '../upgrade/UpgradePage';
import WatchlistPage from '../watchlist/WatchlistPage';
import AssetIndexPage from '../asset-index/AssetIndexPage';
import AssetIndexTable from '../asset-index/AssetIndexTable';
import RiseFallTablePage from '../rise-fall-table/RiseFallTablePage';
import TradingTimesPage from '../trading-times/TradingTimesPage';
import TradingTimesTable from '../trading-times/TradingTimesTable';
import PortfolioPage from '../portfolio/PortfolioPage';
import SettingsPage from '../settings/SettingsPage';
import SettingsPersonalDetails from '../settings/SettingsPersonalDetails';
import SettingsSecurity from '../settings/SettingsSecurity';
import SettingsSelfExclusion from '../settings/SettingsSelfExclusion';
import SettingsLimits from '../settings/SettingsLimits';
import StatementPage from '../statement/StatementPage';
import VideoListContainer from '../video/VideoListContainer';
import NewsContainer from '../news/NewsContainer';
import PaymentAgentsModal from '../payment-agents/PaymentAgentsModal';
import ChartTest from '../charting/ChartTest';
import TradesPage from '../fulltrade/TradesPage';

import { requireAuthOnEnter } from '../_data/Auth';

export default [
    { path: 'portfolio', component: PortfolioPage, onEnter: requireAuthOnEnter },
    { path: 'statement', component: StatementPage, onEnter: requireAuthOnEnter },
    { path: 'create-account', component: CreateAccountPage },
    { path: 'upgrade', component: UpgradePage },
    { path: 'trade', component: TradesPage, onEnter: requireAuthOnEnter },
    { path: 'watchlist', component: WatchlistPage, onEnter: requireAuthOnEnter },
    { path: 'asset-index', component: AssetIndexPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: AssetIndexTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'trading-times', component: TradingTimesPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: TradingTimesTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'rise-fall-table', component: RiseFallTablePage, onEnter: requireAuthOnEnter },
    { path: 'settings',
        indexRoute: { component: SettingsPersonalDetails },
        onEnter: requireAuthOnEnter,
        component: SettingsPage,
        childRoutes: [
        { path: 'security', component: SettingsSecurity },
        { path: 'exclusion', component: SettingsSelfExclusion },
        { path: 'limits', component: SettingsLimits },
    ] },
    { path: 'video', component: VideoListContainer },
    { path: 'news', component: NewsContainer },
    { path: 'chart', component: ChartTest },
    { path: 'deposit', component: PaymentAgentsModal },
];
