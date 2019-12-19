import { combineReducers } from 'redux';
import general from './general.red';


const appReducer = combineReducers({
    /* your app’s top-level reducers */
    general,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action)
}

export default (rootReducer)