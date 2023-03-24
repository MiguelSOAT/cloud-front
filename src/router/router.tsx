import authenticated from '../services/authservice';
import Files from '../pages/files/files';
import Settings from '../pages/settings/settings';
import Home from '../pages/home/home';
import Signup from '../pages/signup/signup';
import Login from '../pages/login/login';
import NotFound from '../pages/not-found/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AllRoutes = () => {
	const isLoggedIn = authenticated();

	const redirect = (element: JSX.Element): JSX.Element => {
		if (isLoggedIn) {
			return element;
		} else {
			return <Login />;
		}
	};

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={redirect(<Home />)} />
					<Route path="/explore" element={redirect(<Files />)} />
					<Route path="/settings" element={redirect(<Settings />)} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AllRoutes;
