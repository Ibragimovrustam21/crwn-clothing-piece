import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk
].filter(Boolean) // agar production rejimida bo`lsak logger consoleda kurinmasligi un qilindi

const composeEnhanser = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhansers = composeEnhanser(applyMiddleware(...middleware))

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composeEnhansers)
export const persistor = persistStore(store)
