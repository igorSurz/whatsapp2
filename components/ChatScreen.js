import { Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';

import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

function ChatScreen() {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [messagesSnapshot] = useCollection(
		db
			.collection('chats')
			.doc(router.query.id)
			.collection('messages')
			.orderBy('timestamp', 'asc')
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map(message => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime()
					}}
				/>
			));
		}
	};

	return (
		<Container>
			<Header>
				<Avatar />
				<HeaderInformation>
					<h3>Rec Email</h3>
					<p>last seen..</p>
				</HeaderInformation>
				<HeaderIcons>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</HeaderIcons>
			</Header>
			<MessageContainer>
				{showMessages()}
				<EndOfMessage />
			</MessageContainer>
			<InputContainer>
				<InsertEmoticonIcon />
				<Input />
				<MicIcon />
			</InputContainer>
		</Container>
	);
}

export default ChatScreen;

const Container = styled.div``;

const Input = styled.input`
	flex: 1;
	outline: 0;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`;

const Header = styled.div`
	position: sticky;
	background-color: white;
	z-index: 100;
	top: 0;
	display: flex;
	padding: 11px;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
	margin-left: 15px;
	flex: 1;
	> h3 {
		margin-bottom: 3px;
	}
	> p {
		font-size: 14px;
		color: gray;
	}
`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
	padding: 30px;

	background-color: #e5ded8;
	min-height: 90vh;
`;

const HeaderIcons = styled.div``;
