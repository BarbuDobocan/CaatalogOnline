import {applyMiddleware, createStore, compose} from 'redux';
import { reducers } from "./redux/reducer";
import { appMidleware } from  "./redux/middleware";

export default(initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
    return createStore(reducers, initialState, composeEnhancers(applyMiddleware(...appMidleware)))
}
