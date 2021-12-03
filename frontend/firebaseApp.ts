import firebase from 'firebase/app';

const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

interface FirebaseClientResult {
  firebase: any;
  analytics: firebase.analytics.Analytics;
};

const getFirebaseClient = async (): Promise<FirebaseClientResult> => {
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
  const analytics  = await import('firebase/analytics')
    .then(() => {
      if(firebase)
        return firebase.analytics();
    });
  //analytics.setAnalyticsCollectionEnabled(false);
  return { firebase, analytics };
};

export default getFirebaseClient;
