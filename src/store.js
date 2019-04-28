import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './reducers/index';
import fbConfig from './config/firebaseConfig'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from  'react-redux-firebase'

const persistConfig = {
   active: true,
   key: 'root',
   debug: true,
   storage,
}

// Middleware definition
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

thunk.withExtraArgument = createThunkMiddleware;

const persistedReducer = persistReducer(persistConfig, rootReducer);
const defaultState = {};

const store = createStore(persistedReducer, defaultState,
 composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
   reduxFirestore(fbConfig),
   reactReduxFirebase(fbConfig)
   )
);

if (module.hot) {
   module.hot.accept('./reducers/',() => {
      const nextRootReducer = persistReducer(persistConfig, rootReducer);
      store.replaceReducer(nextRootReducer);
   });
}

export const history = createBrowserHistory();
export const exportedStore = store;
export const persistor = persistStore(store);