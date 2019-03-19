import * as api from '../api';

export function signIn(credentials, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.signIn(credentials, { getFirebase, getFirestore })
      .then(user => dispatch({ type: 'SIGN_IN', user: user }))
      .then(() => {if (cb) cb();})
      .catch((err) => dispatch({ type: 'LOGIN_ERR', details: [err.message] }));
   };
}

//When a resource is clicked by a user
export function addClick(numClicks, clickIds, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.addClick(numClicks, clickIds, { getFirebase, getFirestore })
      .then(() => { if(cb) cb(); })
      .catch(err => dispatch({ type: 'ADD_CLICK_ERR', details: [err.message] }));
   }
}

export function signOut(cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      return dispatch({ type: 'SIGN_OUT' })
      .then(() => {if (cb) cb();});
   };
}

export function register(data, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.postPrs(data, { getFirebase, getFirestore })
      .then(() => {if (cb) cb();})
      .catch(error => 
       dispatch({type: 'REGISTER_ERR', details: [error.message] }));
   };
}

export function updateAdminResources(cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.getAdminResources({ getFirebase, getFirestore })
      .then((resources) => {
         console.log("RESOURCES: ", resources);
         dispatch({ type: 'UPDATE_RESOURCES', resources })
      })
      .then(() => { if (cb) cb(); });
   };
}

export function updateResources(cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.getResources({ getFirebase, getFirestore })
      .then((resources) => {
         dispatch({ type: 'UPDATE_RESOURCES', resources })
      })
      .then(() => { if (cb) cb(); });
   };
}

export function addResource(resource, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.addResource(resource, { getFirebase, getFirestore })
      .then((resource) => {
         dispatch({ type: 'ADD_RESOURCE', resource })
      })
      .then(() => { if (cb) cb(); });
   };
}

export function modResource(resource, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.putResource(resource, { getFirebase, getFirestore })
      .then(() => dispatch({ type: 'UPDATE_RESOURCE', id: resource.id}))
      .then(() => { if (cb) cb(); })
   }
} 

export function addConversation(users, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.checkCnvIsNew(users, { getFirebase, getFirestore })
      .then(cnv => dispatch({ type: 'ADD_CONV', cnv }))
      .then(() => { if (cb) cb(); })
      .catch(err => dispatch({ type: 'CNV_ERR', details: [err] }));
   };
}

export function updateConversations(userEmail, cb) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.getCnvsUser1(userEmail, getFirestore)
      .then(cnvs => {
         dispatch({ type: 'UPDATE_CONVS', cnvs })
         return  api.getCnvsUser2(userEmail, getFirestore)
      })
      .then(cnvs => dispatch({ type: 'ADD_CNVS', cnvs }))
      .then(() => {if (cb) cb()});
   };
}

export function modProfile(profile, id, oldPwd, cb) {
   return (dispatch, prevState, { getFirestore, getFirebase }) => {
      api.putProfile(profile, id, oldPwd, { getFirebase, getFirestore })
      .then(() => dispatch({ type: 'UPDATE_PRSS', id: id, data: profile }))
      .then(() => { if (cb) cb(); })
      .catch((error) => dispatch({ type: 'UPDATE_PRSS_ERR', details: [error] }));
   };
}

export function addMessage(cnvId, msg) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.addMsg(cnvId, msg, getFirestore)
      .then(msgs => dispatch({ type: 'UPDATE_MSGS', msgs }));
   };
}

export function updateMessages(cnvId) {
   return (dispatch, prevState, { getFirebase, getFirestore }) => {
      api.getMsgs(cnvId, getFirestore)
      .then(msgs => dispatch({ type: 'UPDATE_MSGS', msgs }));
   };
}

export function clearErrs() {
   return (dispatch, prevState) => {
      return dispatch({ type: 'CLEAR_ERRS' });
   };
}

export function clearConversations() {
   return (dispatch, prevState) => {
      return dispatch({ type: 'CLEAR_CONVERSATIONS' });
   };
}

export function clearMessages() {
   return (dispatch, prevState) => {
      return dispatch({ type: 'CLEAR_MESSAGES' });
   };
}
