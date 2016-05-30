import SigninMobile from '../signin/SigninMobile';
import CreateAccountMobile from '../create-account/CreateAccountMobile';
import TradeMobile from '../trade/TradeMobile';
import PayoutPickerMobile from '../payout-picker/PayoutPickerMobile';
import PortfolioMobile from '../portfolio/PortfolioMobile';
import ContractDetailsMobile from '../contract-details/ContractDetailsMobile';
import StatementMobile from '../statement/StatementMobile';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetPickerMobile from '../asset-picker/AssetPickerMobile';
import TradeTypePickerMobile from '../trade-type-picker/TradeTypePickerMobile';
import SettingsMobile from '../settings/SettingsMobile';
import NewsMobile from '../mobile/NewsMobile';
import ArticleMobile from '../news/ArticleMobile';
import ResourcesMobile from '../mobile/ResourcesMobile';
import DepositMobile from '../deposit/DepositMobile';
import TickDurationMobile from '../duration-picker/TickDurationMobile';
import { requireAuthOnEnter, signout } from '../_data/Auth';

export default [
    { path: 'signin', component: SigninMobile },
    { path: 'create-account', component: CreateAccountMobile },
    { path: 'signout', component: SigninMobile, onEnter: signout },
    { path: 'mobile', component: TradeMobile, onEnter: requireAuthOnEnter },
    { path: 'full-trade-mobile', component: TradeMobile, onEnter: requireAuthOnEnter },
    { path: 'payout-picker/:id', component: PayoutPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'portfolio-mobile', component: PortfolioMobile, onEnter: requireAuthOnEnter },
    { path: 'contract/:id', component: ContractDetailsMobile, onEnter: requireAuthOnEnter },
    { path: 'statement-mobile', component: StatementMobile, onEnter: requireAuthOnEnter },
    { path: 'watchlist-mobile', component: WatchlistMobile, onEnter: requireAuthOnEnter },
    { path: 'asset-picker', component: AssetPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'trade-type-picker', component: TradeTypePickerMobile, onEnter: requireAuthOnEnter },
    { path: 'settings-mobile', component: SettingsMobile, onEnter: requireAuthOnEnter },
    { path: 'news-mobile', component: NewsMobile },
    { path: 'article/:index', component: ArticleMobile },
    { path: 'resources-mobile', component: ResourcesMobile },
    { path: 'deposit', component: DepositMobile, onEnter: requireAuthOnEnter },
    { path: 'duration', component: TickDurationMobile, onEnter: requireAuthOnEnter },
];
