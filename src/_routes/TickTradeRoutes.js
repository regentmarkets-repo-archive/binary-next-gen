import SigninMobile from '../signin/SigninMobile';
import TickTradeMobile from '../tick-trade/TickTradeMobile';
import PayoutSelectorMobile from '../tick-trade/PayoutSelectorMobile';
import PurchaseConfirmationMobile from '../tick-trade/PurchaseConfirmationMobile';
import { PortfolioMobile } from '../portfolio';
import ContractDetailsMobile from '../contract-details/ContractDetailsMobile';
import { StatementMobile } from '../statement';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetSelectorMobile from '../asset-selector/AssetSelectorMobile';
import TradeTypeSelectorMobile from '../trade-type-selector/TradeTypeSelectorMobile';
import ProfitTableMobile from '../profit-table/ProfitTableMobile';
import SettingsMobile from '../settings/SettingsMobile';
import NewsMobile from '../news/NewsMobile';
import VideoMobile from '../video/VideoMobile';

import { requireAuthOnEnter, signout } from '../_data/Auth';

export default [
    { path: 'signin', component: SigninMobile },
    { path: 'signout', component: SigninMobile, onEnter: signout },
    { path: 'tick-trade', component: TickTradeMobile, onEnter: requireAuthOnEnter },
    { path: 'payout-selector', component: PayoutSelectorMobile, onEnter: requireAuthOnEnter },
    { path: 'purchase-confirmation', component: PurchaseConfirmationMobile, onEnter: requireAuthOnEnter },
    { path: 'portfolio-mobile', component: PortfolioMobile, onEnter: requireAuthOnEnter },
    { path: 'contract/:id', component: ContractDetailsMobile, onEnter: requireAuthOnEnter },
    { path: 'statement-mobile', component: StatementMobile, onEnter: requireAuthOnEnter },
    { path: 'watchlist-mobile', component: WatchlistMobile, onEnter: requireAuthOnEnter },
    { path: 'asset-selector', component: AssetSelectorMobile, onEnter: requireAuthOnEnter },
    { path: 'trade-type-selector', component: TradeTypeSelectorMobile, onEnter: requireAuthOnEnter },
    { path: 'profit-table-mobile', component: ProfitTableMobile, onEnter: requireAuthOnEnter },
    { path: 'settings-mobile', component: SettingsMobile, onEnter: requireAuthOnEnter },
    { path: 'news-mobile', component: NewsMobile },
    { path: 'video-mobile', component: VideoMobile },
];
