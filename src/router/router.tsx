import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Files from '../pages/files/files';
import Home from '../pages/home/home';
import Header from '../template/header/header';

const AllRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Header>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Files />} />
						<Route path="/settings" element={<Files />} />
					</Routes>
				</Header>
			</BrowserRouter>
		</div>
	);
};

export default AllRoutes;
