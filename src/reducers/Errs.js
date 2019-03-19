export default function Errs(state = [], action) {
   console.log("Errs Reducing Action ", action.type);
   
   switch (action.type) {
      case 'REGISTER_ERR':
      case 'CNV_ERR':
      case 'MSG_ERR':
      case 'LOGIN_ERR':
      case 'ADD_CLICK_ERR':
         return action.details;
      case 'UPDATE_PRSS_ERR':
         return action.details;
      case 'CLEAR_ERRS':
         return [];
      default:
         return state;
   }
}
