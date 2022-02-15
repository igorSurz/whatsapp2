import { useEffect } from 'react';
import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Login from './login';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			const userRef = collection(db, 'users');
			setDoc(doc(userRef, user.uid), {
				email: user.email,
				lastSeen: serverTimestamp(),
				photoURL: user.photoURL
			});
		}
	}, [user]);

	if (loading) return <Loading />;
	if (!user) return <Login />;

	return <Component {...pageProps} />;
}

export default MyApp;
