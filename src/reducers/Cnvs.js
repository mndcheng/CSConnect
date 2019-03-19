export default function Cnvs(state = [], action) {
  console.log("Cnvs Reducing Action" + action.type);
   switch (action.type) {
      case 'UPDATE_CONVS': // Replace previous cnvs
         return action.cnvs;
      case 'ADD_CNV':
      case 'ADD_CNVS':
         return state.concat(action.cnvs);
      case 'DELETE_CNV':
         return state.filter(val => val.id !== action.data.id);
      case 'CLEAR_CONVERSATIONS':
         return [];
      default:
         return state;
   }
}
