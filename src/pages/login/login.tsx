import { useState } from 'react';
import LoginComponent from '../../components/login-component/login-component';
import SessionComponent from '../../components/session-component/session-component';
import SignupComponent from '../../components/signup-component/signup-component';

export default function SignupCard() {
	const [isLogin, setIsLogin] = useState(true);
	return (
		<SessionComponent
			title={isLogin ? 'Log in' : 'Sign up'}
			subtitle={isLogin ? 'to start saving your information 🚀' : 'to join to our community 🤗'}
		>
			{isLogin ? (
				<LoginComponent setIsLogin={setIsLogin} />
			) : (
				<SignupComponent setIsLogin={setIsLogin} />
			)}
		</SessionComponent>
	);
}
