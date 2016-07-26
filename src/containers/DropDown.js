import { isMobile } from 'binary-utils';
import PopupDropDown from './PopupDropDown';
import MobilePageDropDown from './MobilePageDropDown';

export default isMobile() ? MobilePageDropDown : PopupDropDown;
