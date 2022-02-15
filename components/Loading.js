import Image from 'next/image';
import logoPic from '../assets/wapplogo.png';
import { Oval } from 'react-loader-spinner';

function Loading() {
	return (
		<center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
			<div>
				<Image alt="" src={logoPic} height={200} width={200} sx={{ marginBottom: 10 }} />

				<Oval color="#3CBC28" height={60} width={200} />
			</div>
		</center>
	);
}

export default Loading;
