import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link
} from '@chakra-ui/react';
import { useState } from 'react';
import Lottie from 'lottie-react';
import Header from '../../components/header/header';

export default function SignupCard() {
	return (
		<Header>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}
			>
				<Lottie animationData={require('../../assets/lottie/error-500.json')} autoPlay loop />
			</Flex>
		</Header>
	);
}
