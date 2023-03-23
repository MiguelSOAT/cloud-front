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
	FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import './login.css';
export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();

	async function onSubmit(values: any, formProps: any) {
		const username = values.username;
		const password = values.password;

		const payload = {
			username: username,
			password: password
		};
		console.log(payload);
		const url = `http://localhost:8080/v1/login/password?username=${username}&password=${password}`;
		const response: Response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			body: JSON.stringify(payload)
		});

		// retrieve cookie from response
		const cookie = response.headers.get('Set-Cookie');
		response.headers.forEach((value, name) => {
			console.log(name, value);
		});

		// const json = await response.json();
		if (response.status === 200) {
			// console.log(json);
			// localStorage.setItem('token', json.token);
			// navigate('/');
		} else {
			console.log('Error');
			// console.log(json);
			formProps.setFieldError('authentication', 'Invalid username or password');
		}
	}

	function validateUsername(value: string) {
		let error;
		if (!value) {
			error = 'Name is required';
		} else if (value.length < 3 || value.length > 20) {
			error = 'Name must be between 3 and 20 characters';
		}
		return error;
	}

	function validatePassword(value: string) {
		let error;
		if (!value) {
			error = 'Password is required';
		} else if (value.length < 9) {
			error = 'Password must be at least 9 characters';
		}
		return error;
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
						Log in
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to join to our community 🤗
					</Text>
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<Formik
							initialValues={{
								username: '',
								password: '',
								authentication: ''
							}}
							onSubmit={onSubmit}
						>
							{(props) => {
								return (
									<Form>
										<FormControl id="username" isRequired>
											<Field name="username" validate={validateUsername}>
												{(formikObject: any) => (
													<FormControl
														isInvalid={
															formikObject.form.errors.username &&
															formikObject.form.touched.username
														}
													>
														<FormLabel>Username</FormLabel>
														<Input {...formikObject.field} type="text" />
														<FormErrorMessage>{formikObject.form.errors.username}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											{/* <Input name="username" type="text" /> */}
										</FormControl>
										<FormControl id="password" isRequired>
											<Field name="password" validate={validatePassword}>
												{(formikObject: any) => (
													<FormControl
														isInvalid={
															formikObject.form.errors.password &&
															formikObject.form.touched.password
														}
													>
														<FormLabel>Password</FormLabel>
														<InputGroup>
															<Input
																{...formikObject.field}
																type={showPassword ? 'text' : 'password'}
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
														<FormErrorMessage>{formikObject.form.errors.password}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										</FormControl>
										<FormControl id="authentication" isRequired>
											<Field name="authentication">
												{(formikObject: any) => (
													<FormControl isInvalid={formikObject.form.errors.authentication}>
														<FormErrorMessage>
															{formikObject.form.errors.authentication}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<FormErrorMessage>Password is required</FormErrorMessage>
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
												Log in
											</Button>
										</Stack>
										<Stack pt={6}>
											<Text align={'center'}>
												Already a user?{' '}
												<Link color={'blue.400'} as={NavLink} to="/signup">
													Sign up
												</Link>
											</Text>
										</Stack>
									</Form>
								);
							}}
						</Formik>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
