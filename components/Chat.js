import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

function Chat({ id, users }) {
	const [user] = useAuthState(auth);
	const recipientEmail = getRecipientEmail(users, user);

	const usersRef = collection(db, 'users');
	// Create a query against the collection.
	const q = query(usersRef, where('email', '==', recipientEmail));
	const [recipientSnapshot] = useCollection(q);

	const recipient = recipientSnapshot?.docs?.[0]?.data();

	return (
		<Container>
			{recipient ? (
				<UserAvatar src={recipient?.photoURL} />
			) : (
				<UserAvatar>{recipientEmail[0]}</UserAvatar>
			)}

			<p>{recipientEmail}</p>
		</Container>
	);
}

export default Chat;

const Container = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	word-break: break-word;

	:hover {
		background-color: #e9eaeb;
	}
`;

const UserAvatar = styled(Avatar)`
	margin: 5px;
	margin-right: 15px;
`;
