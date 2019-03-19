var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var config = {
   apiKey: "AIzaSyAlkqb7cjGq2t0At7BxfricAbWqcLZcKxA",
   authDomain: "csc437-project.firebaseapp.com",
   databaseURL: "https://csc437-project.firebaseio.com",
   projectId: "csc437-project",
   storageBucket: "csc437-project.appspot.com",
   messagingSenderId: "79464523883"
};
const firebaseApp = firebase.initializeApp(config);

export default firebase;