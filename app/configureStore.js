import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import posts from './reducers/posts';
import selectedSubreddit from './reducers/selectedSubreddit';

const rootReducer = combineReducers({
    posts,
    selectedSubreddit
});

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}