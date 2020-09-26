import { combineReducers } from 'redux'
import authReducer from './authReducer'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'

export default combineReducers({    
    auth: authReducer,
    item: itemReducer,
    error: errorReducer
});