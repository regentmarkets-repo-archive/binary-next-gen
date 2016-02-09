import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_reducers';

const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

export default finalCreateStore(rootReducer);
