import NavigationMenuMobile from '../navigation/NavigationMenuMobile';
import SigninMobile from '../signin/SigninMobile';
import TickTradeMobile from '../tick-trade/TickTradeMobile';
import PayoutSelectorMobile from '../tick-trade/PayoutSelectorMobile';
import PurchaseConfirmationMobile from '../tick-trade/PurchaseConfirmationMobile';
import { PortfolioPage, PortfolioMobile, PortfolioPanel } from '../portfolio';
import ContractDetailsMobile from '../contract-details/ContractDetailsMobile';
import { StatementPage, StatementMobile } from '../statement';
import WatchlistMobile from '../watchlist/WatchlistMobile';
import AssetSelectorMobile from '../asset-selector/AssetSelectorMobile';
import TradeTypeSelectorMobile from '../trade-type-selector/TradeTypeSelectorMobile';
import ProfitTableMobile from '../profit-table/ProfitTableMobile';
import SettingsMobile from '../settings/SettingsMobile';
import SettingsSecurity from '../settings/SettingsSecurity';
import SettingsSelfExclusion from '../settings/SettingsSelfExclusion';
import SettingsLimits from '../settings/SettingsLimits';
import SettingsPersonalDetails from '../settings/SettingsPersonalDetails';

import { requireAuthOnEnter, signout } from '../_data/Auth';

export default [
    { path: '/', component: TickTradeMobile, onEnter: requireAuthOnEnter },
    { path: 'nav', component: NavigationMenuMobile },
    { path: 'signin', component: SigninMobile },
    { path: 'signout', component: SigninMobile, onEnter: signout },
    { path: 'tick-trade', component: TickTradeMobile },
    { path: 'payout-selector', component: PayoutSelectorMobile },
    { path: 'purchase-confirmation', component: PurchaseConfirmationMobile },
    { path: 'portfolio', component: PortfolioPage },
    { path: 'portfolio-mobile', component: PortfolioMobile },
    { path: 'portfolio-panel', component: PortfolioPanel },
    { path: 'contract/:id', component: ContractDetailsMobile },
    { path: 'statement', component: StatementPage },
    { path: 'statement-mobile', component: StatementMobile },
    { path: 'watchlist-mobile', component: WatchlistMobile },
    { path: 'asset-selector', component: AssetSelectorMobile },
    { path: 'trade-type-selector', component: TradeTypeSelectorMobile },
    { path: 'profit-table-mobile', component: ProfitTableMobile },
    { path: 'settings-mobile', indexRoute: { component: SettingsPersonalDetails }, component: SettingsMobile, childRoutes: [
        { path: 'security', component: SettingsSecurity },
        { path: 'exclusion', component: SettingsSelfExclusion },
        { path: 'limits', component: SettingsLimits },
    ]},
];
