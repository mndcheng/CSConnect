import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

import Prss from './Prss';
import Cnvs from './Cnvs';
import Msgs from './Msgs';
import Errs from './Errs';
import Resources from './Resources'

const rootReducer = combineReducers({
   Prss, 
   Cnvs, 
   Msgs, 
   Errs, 
   Resources, 
   firebase: firebaseReducer, 
   firestore: firestoreReducer
});

export default rootReducer;
