import SigninMobile from '../signin/SigninMobile';
import HelloMobile from '../hello/HelloMobile';
import CreateAccountMobile from '../create-account/CreateAccountMobile';
import TradeMobile from '../trade/mobile/TradeMobile';
import PayoutPickerMobile from '../payout-picker/PayoutPickerMobile';
import PortfolioMobile from '../portfolio/PortfolioMobile';
import ContractDetailsMobile from '../contract-details/mobile/ContractDetailsMobile';
import StatementMobile from '../statement/StatementMobile';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetPickerMobile from '../asset-picker/AssetPickerMobile';
import TradeTypePickerMobile from '../trade-type-picker/TradeTypePickerMobile';
import SettingsMobile from '../settings/SettingsMobile';
import NewsMobile from '../mobile/NewsMobile';
import ArticleMobile from '../news/ArticleMobile';
import ResourcesMobile from '../mobile/ResourcesMobile';
import DepositMobile from '../deposit/DepositMobile';
import { requireAuthOnEnter, signout } from '../_data/Auth';

export default [
    { path: 'signin', component: SigninMobile },
    { path: 'hello', component: HelloMobile },
    { path: 'signup', component: CreateAccountMobile },
    { path: 'signout', component: SigninMobile, onEnter: signout },
    { path: 'mobile', component: TradeMobile, onEnter: requireAuthOnEnter },
    { path: 'payout/:id', component: PayoutPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'portfolio', component: PortfolioMobile, onEnter: requireAuthOnEnter },
    { path: 'contract/:id', component: ContractDetailsMobile, onEnter: requireAuthOnEnter },
    { path: 'statement', component: StatementMobile, onEnter: requireAuthOnEnter },
    { path: 'watchlist', component: WatchlistMobile, onEnter: requireAuthOnEnter },
    { path: 'assets', component: AssetPickerMobile, onEnter: requireAuthOnEnter },
    { path: 'trade-type', component: TradeTypePickerMobile, onEnter: requireAuthOnEnter },
    { path: 'settings', component: SettingsMobile, onEnter: requireAuthOnEnter },
    { path: 'news', component: NewsMobile },
    { path: 'article/:index', component: ArticleMobile },
    { path: 'resources', component: ResourcesMobile },
    { path: 'deposit', component: DepositMobile, onEnter: requireAuthOnEnter },
];
