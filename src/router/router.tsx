import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Files from '../pages/files/files';
import Settings from '../pages/settings/settings';
import Home from '../pages/home/home';
import Header from '../template/header/header';
import Signup from '../pages/signup/signup';
import Login from '../pages/login/login';
import NotFound from '../pages/not-found/not-found';

const locationPath = window.location.pathname;
const AllRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/explore" element={<Files />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AllRoutes;
