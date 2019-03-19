import { createStore, applyMiddleware } from 'redux';
// import { syncHistoryWithStore} from 'react-router-redux';
import { createBrowserHistory } from 'history';
// import the root reducer
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// redux persist components
import { persistStore, persistReducer } from 'redux-persist';
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/index';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from  'react-redux-firebase'
import fbConfig from './config/firebaseConfig'

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

// const store = createStore(rootReducer, defaultState,
//  composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(persistedReducer, defaultState,
 composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
   reduxFirestore(fbConfig),
   reactReduxFirebase(fbConfig)
   )
);

if (module.hot) {
   module.hot.accept('./reducers/',() => {
      // const nextRootReducer = require('./reducers/index').default;
      const nextRootReducer = persistReducer(persistConfig, rootReducer);
      // console.log("NEXT ROOT REDUCER", nextRootReducer);
      store.replaceReducer(nextRootReducer);
   });
}

export const history = createBrowserHistory();
export const exportedStore = store;
export const persistor = persistStore(store);
