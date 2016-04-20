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
import SettingsSecurity from '../settings/SettingsSecurity';
import SettingsSelfExclusion from '../settings/SettingsSelfExclusion';
import SettingsLimits from '../settings/SettingsLimits';
import StatementPage from '../statement/StatementPage';
import VideoListContainer from '../video/VideoListContainer';
import NewsContainer from '../news/NewsContainer';
import DepositModal from '../deposit/DepositModal';
import TradesPage from '../trades/TradesPage';
import TickTradePage from '../tick-trade/TickTradePage';
import FullTradePage from '../fulltrade/FullTradePage';
import JpTradePage from '../jp-trade/JpTradePage';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import LayoutButtonPanel from '../layout-picker/LayoutButtonPanel';
import LabeledList from '../containers/FlexList';

import { requireAuthOnEnter } from '../_data/Auth';

export default [
    { path: 'trades', component: TradesPage, onEnter: requireAuthOnEnter },
    { path: 'tick-trade', component: TickTradePage, onEnter: requireAuthOnEnter },
    { path: 'full-trade', component: FullTradePage, onEnter: requireAuthOnEnter },
    { path: 'jp-trade', component: JpTradePage, onEnter: requireAuthOnEnter },
    { path: 'header', component: WebHeader, onEnter: requireAuthOnEnter },
    { path: 'workspace', component: WorkspaceContainer, onEnter: requireAuthOnEnter },
    { path: 'portfolio', component: PortfolioPage, onEnter: requireAuthOnEnter },
    { path: 'statement', component: StatementPage, onEnter: requireAuthOnEnter },
    { path: 'create-account', component: CreateAccountPage },
    { path: 'upgrade', component: UpgradePage },
    { path: 'watchlist', component: WatchlistPage, onEnter: requireAuthOnEnter },
    { path: 'asset-details', component: AssetDetailsPage },
    { path: 'asset-index', component: AssetIndexPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: AssetIndexTable, onEnter: requireAuthOnEnter },
    ] },
    { path: 'trading-times', component: TradingTimesPage, onEnter: requireAuthOnEnter, childRoutes: [
        { path: ':market', component: TradingTimesTable, onEnter: requireAuthOnEnter },
    ] },
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
    { path: 'deposit', component: DepositModal },
    { path: 'layout', component: LayoutButtonPanel },
    { path: 'flexlist', component: LabeledList },
];
