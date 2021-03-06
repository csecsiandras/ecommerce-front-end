import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCJ2fDaViGdLtwLqmFK3eJOxDzbFXj_kX4',
  authDomain: 'crwn-db-aa0da.firebaseapp.com',
  databaseURL: 'https://crwn-db-aa0da.firebaseio.com',
  projectId: 'crwn-db-aa0da',
  storageBucket: '',
  messagingSenderId: '440746065241',
  appId: '1:440746065241:web:6c8bacf8250d2b20fbe048'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
