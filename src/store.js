import { createStore, applyMiddleware,compose } from 'redux';
import middleware from './middleware/general.mid'
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk,middleware)
        ),
    );
}