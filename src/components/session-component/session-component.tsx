import { Grid, VStack, Heading, Stack, Text, Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import cloudAnimation from '../../assets/lottie/login-cloud-computing.json';
import Typewriter from 'typewriter-effect';

export default function SessionComponent(props: any) {
	const children = props.children;
	return (
		<Grid
			templateColumns={{ md: '3fr 5fr' }}
			h={'100vh'}
			backgroundColor={'#1d1d1d'}
			alignContent={'center'}
			color={'#fafafa'}
			w={{ base: '100vw', md: '100%' }}
		>
			<VStack
				h="100vh"
				display={{ base: 'none', md: 'flex' }}
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Heading fontSize="4xl" textAlign="center">
					<Typewriter
						options={{
							strings: ['Secure.', 'Reliable.', 'Professional.', 'Versatile.'],
							autoStart: true,
							loop: true
						}}
					/>
				</Heading>
				<Text fontSize="xl" fontWeight={500} marginLeft={0}>
					Your cloud solution.
				</Text>
				<Text fontSize="md">Discover the new way of storing your data.</Text>
				<Box width={'70%'}>
					<Lottie animationData={cloudAnimation} />
				</Box>
			</VStack>

			<Stack
				spacing={12}
				m={'auto'}
				py={12}
				px={12}
				minH={'100vh'}
				backgroundColor={'#fafafa'}
				color={'black'}
				boxShadow={{ base: 'none', md: 'inset 5px 0px 3px #252525' }}
				w={{ base: '100vw', md: '100%' }}
				display={'flex'}
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				{children}
			</Stack>
		</Grid>
	);
}
