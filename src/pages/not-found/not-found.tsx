import { Flex, useColorModeValue } from '@chakra-ui/react';
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
				<Lottie animationData={require('../../assets/lottie/not-found.json')} autoPlay loop />
			</Flex>
		</Header>
	);
}
