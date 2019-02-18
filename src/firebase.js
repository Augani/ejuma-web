import firebase from 'firebase/app';

import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyBLky9lCfeoP3RnlnD8it5CfHd2Pe2AG0o",
    authDomain: "ejumaapp.firebaseapp.com",
    databaseURL: "https://ejumaapp.firebaseio.com",
    projectId: "ejumaapp",
    storageBucket: "ejumaapp.appspot.com",
    messagingSenderId: "12869040001"
  };
  firebase.initializeApp(config);

  export default firebase;