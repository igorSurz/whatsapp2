import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth } from '../firebase';

function Chat({ id, users }) {
	const [user] = useAuthState(auth);
	const recipientEmail = getRecipientEmail(users, user);

	return (
		<Container>
			<UserAvatar />
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
