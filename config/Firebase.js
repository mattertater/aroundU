import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyD8otYSNsiNUtmosMlPvNMBpB6DxOtfWF4",
    authDomain: "aroundu-a3eea.firebaseapp.com",
    databaseURL: "https://aroundu-a3eea.firebaseio.com",
    projectId: "aroundu-a3eea",
    storageBucket: "aroundu-a3eea.appspot.com",
    messagingSenderId: "1048331488094"
};
firebase.initializeApp(config);

export default firebase;