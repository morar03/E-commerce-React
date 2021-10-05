import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyD8upb3kB83FvBDJqnyYkpcqlOWYOuMJa8",
    authDomain: "crwn-db-fe18d.firebaseapp.com",
    projectId: "crwn-db-fe18d",
    storageBucket: "crwn-db-fe18d.appspot.com",
    messagingSenderId: "212513640744",
    appId: "1:212513640744:web:1343d3a07445888d8e801d",
    measurementId: "G-11051S6SXF"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider =  new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  