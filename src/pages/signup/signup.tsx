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
	Link,
	FormErrorMessage,
	FormHelperText
} from '@chakra-ui/react';
import { EventHandler, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleUsernameChange = (e: any) => setUsername(e.target.value);
	const handlePasswordChange = (e: any) => setPassword(e.target.value);
	const handleConfirmPasswordChange = (e: any) => setConfirmPassword(e.target.value);

	const isUsernameError = username === '';
	const isPasswordError = password === '';
	const isConfirmPasswordError = confirmPassword === '';

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();

	function onSubmit(values: any) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(JSON.stringify(values, null, 2));
				resolve(true);
			}, 3000);
		});
	}

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
						Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to join to our community 🤗
					</Text>
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl id="username" isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									id="username"
									type="text"
									{...register('username', {
										required: 'This is required',
										minLength: { value: 3, message: 'Minimum length should be 4' },
										maxLength: { value: 20, message: 'Maximum length should be 20' }
									})}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										{...register('password', {
											required: 'This is required',
											minLength: { value: 6, message: 'Minimum length should be 6' },
											maxLength: { value: 20, message: 'Maximum length should be 20' }
										})}
									/>
									<InputRightElement h={'full'}>
										<Button
											variant={'ghost'}
											onClick={() => setShowPassword((showPassword) => !showPassword)}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
								<FormErrorMessage>Password is required</FormErrorMessage>
							</FormControl>
							<FormControl id="password-confirm" isRequired>
								<FormLabel>Confirm Password</FormLabel>
								<InputGroup>
									<Input
										id="password-confirm"
										type={showConfirmPassword ? 'text' : 'password'}
										{...register('password-confirm', {
											required: 'This is required',
											minLength: { value: 6, message: 'Minimum length should be 6' },
											maxLength: { value: 20, message: 'Maximum length should be 20' }
										})}
									/>
									<InputRightElement h={'full'}>
										<Button
											variant={'ghost'}
											onClick={() =>
												setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
											}
										>
											{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500'
									}}
									type="submit"
									isLoading={isSubmitting}
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Already a user?{' '}
									<Link color={'blue.400'} as={NavLink} to="/login">
										Login
									</Link>
								</Text>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
