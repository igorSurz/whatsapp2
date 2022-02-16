import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBioje-BpPIxvaeUvnOWE7xQqL5Kfg_Yx8',
	authDomain: 'whatsapp2-6dd99.firebaseapp.com',
	projectId: 'whatsapp2-6dd99',
	storageBucket: 'whatsapp2-6dd99.appspot.com',
	messagingSenderId: '67890551268',
	appId: '1:67890551268:web:27389d7ee0e89be2744ff1',
	measurementId: 'G-H4GWWF84YL'
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
