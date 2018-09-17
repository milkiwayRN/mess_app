import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import get from 'lodash/get';

import reducer from './reducers';
import history from './history';
import userStorage from './utils/SessionUserStorage';
import { watchRequestUserInfo, watchRequestUserLogin } from './sagas/UserSagas';
import { requestUser } from './actions/UserActions';

const initialState = {
    user: get(userStorage, 'data', null) === null ? {} : get(userStorage, 'data.user', {}),
};

const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(middleware, sagaMiddleware)),
);

sagaMiddleware.run(watchRequestUserInfo);
sagaMiddleware.run(watchRequestUserLogin);

store.dispatch(requestUser());


export default store;
