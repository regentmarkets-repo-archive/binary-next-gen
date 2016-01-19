import SigninMobile from '../signin/SigninMobile';
import CreateAccountMobile from '../create-account/CreateAccountMobile';
import TickTradeMobile from '../tick-trade/TickTradeMobile';
import PayoutPickerMobile from '../tick-trade/PayoutPickerMobile';
import PurchaseConfirmationMobile from '../tick-trade/PurchaseConfirmationMobile';
import { PortfolioMobile } from '../portfolio';
import ContractDetailsMobile from '../contract-details/ContractDetailsMobile';
import { StatementMobile } from '../statement';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetPickerMobile from '../asset-picker/AssetPickerMobile';
import TradeTypePickerMobile from '../trade-type-picker/TradeTypePickerMobile';
import ProfitTableMobile from '../profit-table/ProfitTableMobile';
import SettingsMobile from '../settings/SettingsMobile';
import NewsMobile from '../mobile/NewsMobile';
import ArticleMobile from '../news/ArticleMobile';
import ResourcesMobile from '../mobile/ResourcesMobile';
import PaymentAgentsMobile from '../payment-agents/PaymentAgentsMobile';
import DurationMobile from '../tick-trade/DurationMobile';
import QuickTradeContainer from '../quick-trade/QuickTradeContainer';
import TradesContainer from '../fulltrade/TradesContainer';
import { requireAuthOnEnter, signout } from '../_data/Auth';

export default [
    { path: 'signin', component: SigninMobile },
    { path: 'create-account', component: CreateAccountMobile },
    { path: 'signout', component: SigninMobile, onEnter: signout },
    { path: 'mobile', component: TickTradeMobile, onEnter: requireAuthOnEnter },
    { path: 'payout-picker/:id', component: PayoutPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'purchase-confirmation', component: PurchaseConfirmationMobile, onEnter: requireAuthOnEnter },
    { path: 'portfolio-mobile', component: PortfolioMobile, onEnter: requireAuthOnEnter },
    { path: 'contract/:id', component: ContractDetailsMobile, onEnter: requireAuthOnEnter },
    { path: 'statement-mobile', component: StatementMobile, onEnter: requireAuthOnEnter },
    { path: 'watchlist-mobile', component: WatchlistMobile, onEnter: requireAuthOnEnter },
    { path: 'asset-picker/:id', component: AssetPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'trade-type-picker/:id', component: TradeTypePickerMobile, onEnter: requireAuthOnEnter },
    { path: 'profit-table-mobile', component: ProfitTableMobile, onEnter: requireAuthOnEnter },
    { path: 'settings-mobile', component: SettingsMobile, onEnter: requireAuthOnEnter },
    { path: 'news-mobile', component: NewsMobile },
    { path: 'article/:index', component: ArticleMobile },
    { path: 'resources-mobile', component: ResourcesMobile },
    { path: 'payment-agents', component: PaymentAgentsMobile, onEnter: requireAuthOnEnter },
    { path: 'quick-trade', component: QuickTradeContainer, onEnter: requireAuthOnEnter },
    { path: 'duration', component: DurationMobile, onEnter: requireAuthOnEnter },
    { path: 'test', component: TradesContainer, onEnter: requireAuthOnEnter },
];
