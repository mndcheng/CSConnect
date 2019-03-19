export default function Msgs(state = [], action) {
   console.log("Msgs Reducing Action ", action.type);

   switch (action.type) {
      case 'UPDATE_MSGS':
         return action.msgs;
      case 'ADD_MSG':
         return action.msgs;
      case 'CLEAR_MESSAGES':
         return [];
      default:
         return state;
   }
}
