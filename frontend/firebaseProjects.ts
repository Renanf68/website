//import * as admin from 'firebase-admin';
import firebase from 'firebase/app';

const clientCredentials = {
  apiKey: process.env.EXTERNAL_FIREBASE_API_KEY,
  authDomain: process.env.EXTERNAL_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXTERNAL_FIREBASE_DATABASE_URL,
  projectId: process.env.EXTERNAL_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXTERNAL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXTERNAL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXTERNAL_FIREBASE_APP_ID,
  measurementId: process.env.EXTERNAL_FIREBASE_MEASUREMENT_ID,
};

interface FirebaseClientResult {
  firebase: any;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
}

export const getFirebaseProjectsClient = async (): Promise<FirebaseClientResult> => {
  const firebase = await import('firebase/app')
    .then((res) => {
      const fire = res.default
      if (!fire.apps.length) {
        fire.initializeApp(clientCredentials);
      }
      return fire
    })
    .catch((error) => {
      console.log(error)
    });
  const db = await import('firebase/firestore')
    .then(() => {
      if(firebase)
        return firebase.firestore()
    });
  const storage = await import('firebase/storage')
    .then(() => {
      if(firebase)
        return firebase.storage()
    });
  return { firebase, db, storage };
};

//export default getFirebaseProjectsClient;

/*export const getFirebaseProjectsAdmin = async () => {
  // path to service account key json file
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: `app-justo-dev.appspot.com`,
      //storageBucket: `${process.env.EXTERNAL_FIREBASE_PROJECT_ID}.appspot.com`,
    });
    /*const serviceAccount = require('../../app-justo-dev-a0e08f4a58db.json');
    const _secondary = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${process.env.EXTERNAL_FIREBASE_PROJECT_ID}.appspot.com`,
    }, 'secondary');
    return _secondary.storage().bucket();
  } else {
    //const secondary = admin.apps.find(app => app.name === 'secondary');
    //return secondary.storage().bucket();
  }
  return admin.storage().bucket();
};*/
