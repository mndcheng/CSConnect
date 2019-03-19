function Resources(state = [], action) {
   console.log("Resources reducing action " + action.type);
   
   switch(action.type) {
      case 'UPDATE_RESOURCES':
         return action.resources;
      case 'ADD_RESOURCE':
         return state.concat([action.resource]);
      case 'UPDATE_RESOURCE':
         state.map((rsrc) => {
            if (rsrc.id === action.id)
               rsrc.show = !rsrc.show;
         })
      default:
         return state;
   }
}

export default Resources;
