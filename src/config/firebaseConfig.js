var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

  // Initialize Firebase
  var config = {
   apiKey: "AIzaSyDzfy8NBW0efQeWEUSMZQ7MHA4zHqKijN8",
   authDomain: "csconnect-eb8af.firebaseapp.com",
   databaseURL: "https://csconnect-eb8af.firebaseio.com",
   projectId: "csconnect-eb8af",
   storageBucket: "",
   messagingSenderId: "101669985561"
 };
 
 firebase.initializeApp(config);

export default firebase;