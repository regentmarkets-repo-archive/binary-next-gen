import isMobile from 'binary-utils/lib/isMobile';
import PopupDropDown from './PopupDropDown';
import MobilePageDropDown from './MobilePageDropDown';

export default isMobile() ? MobilePageDropDown : PopupDropDown;
