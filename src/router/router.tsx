import Files from '../pages/files/files';
import Settings from '../pages/settings/settings';
import Home from '../pages/home/home';
import Signup from '../pages/signup/signup';
import Login from '../pages/login/login';
import NotFound from '../pages/not-found/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Telegram from '../pages/telegram/telegram';

const AllRoutes = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		if (
			window.location.pathname === '/login' ||
			window.location.pathname === '/signup' ||
			window.location.port === '3000'
		) {
			setLoading(false);
		} else {
			checkIfUserIsAuthorized();
		}

		return () => {
			setLoading(true);
		};
	}, [setLoading]);

	const checkIfUserIsAuthorized = async () => {
		fetch(`/api/v1/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'manual'
		})
			.then((response) => {
				const isAuthorized = response.status === 200;
				if (isAuthorized) {
					setLoading(false);
				} else {
					window.location.href = '/login';
				}
			})
			.catch((error) => {
				// ignore error
			});
	};

	const loadingSpinner = () => {
		return (
			<Center height="100vh" bg="white">
				<Spinner size="xl" color="blue.500" />
			</Center>
		);
	};

	return (
		<div>
			<BrowserRouter>
				{loading ? (
					loadingSpinner()
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Files />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/settings/telegram" element={<Telegram />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
};

export default AllRoutes;
