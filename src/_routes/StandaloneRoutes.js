import WebHeader from '../web/WebHeader';
import CreateAccountPage from '../create-account/CreateAccountPage';
import UpgradePage from '../upgrade/UpgradePage';
import WatchlistPage from '../watchlist/WatchlistPage';
import AssetDetailsPage from '../asset-details/AssetDetailsPage';
import AssetIndexPage from '../asset-index/AssetIndexPage';
import AssetIndexTable from '../asset-index/AssetIndexTable';
import TradingTimesPage from '../trading-times/TradingTimesPage';
import TradingTimesTable from '../trading-times/TradingTimesTable';
import PortfolioPage from '../portfolio/PortfolioPage';
import SettingsPage from '../settings/SettingsPage';
import SettingsPersonalDetails from '../settings/SettingsPersonalDetails';
import SettingsCashier from '../settings/SettingsCashier';
import SettingsSelfExclusion from '../settings/SettingsSelfExclusion';
import SettingsLimits from '../settings/SettingsLimits';
import StatementPage from '../statement/StatementPage';
import VideoListContainer from '../video/VideoListContainer';
import NewsContainer from '../news/NewsContainer';
import DepositModal from '../deposit/DepositModal';
import TradesPage from '../trades/TradesPage';
import SingleTradePage from '../trade/SingleTradePage';
import JpTradePage from '../jp-trade/JpTradePage';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import LayoutButtonPanel from '../layout-picker/LayoutButtonPanel';
import DigitStatsCard from '../digit-stats/DigitStatsCard';

import { requireAuthOnEnter } from '../_data/Auth';

import StatementTesting from '../contract-details/ForTesting';
import Single from '../trade/test/SingleTradeXCard';

export default [
    { path: 'trades', component: TradesPage, onEnter: requireAuthOnEnter },
    { path: 'statement-view/:id', component: StatementTesting, onEnter: requireAuthOnEnter },
    { path: 'trade', component: SingleTradePage, onEnter: requireAuthOnEnter },
    { path: 'jp-trade', component: JpTradePage, onEnter: requireAuthOnEnter },
    { path: 'header', component: WebHeader, onEnter: requireAuthOnEnter },
    { path: 'workspace', component: WorkspaceContainer, onEnter: requireAuthOnEnter },
    { path: 'portfolio-only', component: PortfolioPage, onEnter: requireAuthOnEnter },
    { path: 'statement-only', component: StatementPage, onEnter: requireAuthOnEnter },
    { path: 'signup-only', component: CreateAccountPage },
    { path: 'upgrade-only', component: UpgradePage },
    { path: 'watchlist-only', component: WatchlistPage, onEnter: requireAuthOnEnter },
    { path: 'asset-details-only', component: AssetDetailsPage },
    { path: 'asset-index', component: AssetIndexPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: AssetIndexTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'trading-times', component: TradingTimesPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: TradingTimesTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'settings-only',
        indexRoute: { component: SettingsPersonalDetails },
        onEnter: requireAuthOnEnter,
        component: SettingsPage,
        childRoutes: [
            { path: 'cashier', component: SettingsCashier },
            { path: 'exclusion', component: SettingsSelfExclusion },
            { path: 'limits', component: SettingsLimits },
        ],
    },
    { path: 'video', component: VideoListContainer },
    { path: 'news', component: NewsContainer },
    { path: 'deposit', component: DepositModal },
    { path: 'layout', component: LayoutButtonPanel },
    { path: 'stats', component: DigitStatsCard },
    { path: 'test', component: Single },
];
