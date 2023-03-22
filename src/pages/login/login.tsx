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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Log in
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to start using our app 🚀
					</Text>
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<FormControl id="username" isRequired>
							<FormLabel>Username</FormLabel>
							<Input type="username" />
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} />
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Login"
								size="lg"
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500'
								}}
							>
								Log in
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Does not have an account yet?{' '}
								<Link color={'blue.400'} as={NavLink} to="/signup">
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
