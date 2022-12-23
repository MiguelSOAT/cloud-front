import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Box,
	Heading,
	Stack,
	StackDivider,
	CircularProgress,
	Grid,
	GridItem
} from '@chakra-ui/react';
import Header from './template/header/header';
import Router from './router/router';
import { BrowserRouter } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<Router />
		</div>
	);
}

export default App;
