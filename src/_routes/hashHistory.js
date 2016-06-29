import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';

export default useRouterHistory(createHashHistory)({ queryKey: false });
