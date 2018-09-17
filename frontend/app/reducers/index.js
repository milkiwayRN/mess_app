import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { user } from './UserReducer';
import { loading } from './LoadingReducer';

export default combineReducers({
    routing: routerReducer,
    user,
    loading,
});
