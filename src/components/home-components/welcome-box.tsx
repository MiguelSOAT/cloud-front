import { Box, Flex, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import welcomeAnimation from '../../assets/lottie/welcome.json';

export default function WelcomeComponent(props: any) {
	return (
		<Flex
			width={{ base: '100%', md: '60%' }}
			bg="#1d1d1d"
			borderRadius={'2xl'}
			padding={{ base: '5', md: '10' }}
			direction={'column'}
		>
			<Text
				fontSize="5xl"
				fontWeight="light"
				// color="#1d1d1d"
				align={'center'}
				display="flex"
				alignItems="center"
			>
				Welcome back, {localStorage.getItem('username')}!
			</Text>
			<Box padding={{ base: '20px 5%', md: '0 15%' }}>
				<Lottie animationData={welcomeAnimation} />
			</Box>
		</Flex>
	);
}
