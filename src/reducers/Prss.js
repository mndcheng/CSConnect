function Prss(state = {}, action) {
   console.log("Prss reducing action " + action.type);
   
   switch(action.type) {
      case 'SIGN_IN':
         return action.user;
      case 'SIGN_OUT':
         return {}; // Clear user state
      case 'UPDATE_PRSS': 
         return Object.assign({}, state, { 
            year: action.data.year,
            courses: action.data.courses,
            password: action.data.newPwd || state.password
         });
      default:
         return state;
   }
}

export default Prss;
