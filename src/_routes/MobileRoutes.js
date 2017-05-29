import { requireAuthOnEnter } from '../_data/Auth';
import TradeMobile from '../trade/mobile/TradeMobile';
import PortfolioMobile from '../portfolio/PortfolioMobile';
import ContractDetailsMobile from '../contract-details/mobile/ContractDetailsMobile';
import StatementMobile from '../statement/StatementMobile';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetPickerMobile from '../asset-picker/AssetPickerMobile';
import TradeTypePickerMobile from '../trade-type-picker/TradeTypePickerMobile';
import SettingsMobile from '../settings/SettingsMobile';
import ResourcesMobile from '../mobile/ResourcesMobile';
import DepositMobile from '../deposit/DepositMobile';
import ExamineAssetMobile from '../examine-asset/ExamineAssetMobile';

export default [
    { path: 'mobile', component: TradeMobile, onEnter: requireAuthOnEnter },
    { path: 'portfolio', component: PortfolioMobile, onEnter: requireAuthOnEnter },
    { path: 'contract', component: ContractDetailsMobile, onEnter: requireAuthOnEnter },
    { path: 'statement', component: StatementMobile, onEnter: requireAuthOnEnter },
    { path: 'watchlist', component: WatchlistMobile, onEnter: requireAuthOnEnter },
    { path: 'assets', component: AssetPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'trade-type', component: TradeTypePickerMobile, onEnter: requireAuthOnEnter },
    { path: 'settings', component: SettingsMobile, onEnter: requireAuthOnEnter },
    { path: 'resources', component: ResourcesMobile },
    { path: 'deposit', component: DepositMobile, onEnter: requireAuthOnEnter },
    { path: 'examine', component: ExamineAssetMobile, onEnter: requireAuthOnEnter },
];
