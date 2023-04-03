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
import './signup.css';
export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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

		const response: Response = await fetch('/api/v1/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(payload)
		});

		const json = await response.json();
		if (response.status === 200) {
			localStorage.setItem('username', username);
			navigate('/');
		} else {
			formProps.setFieldError('authentication', json.message);
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

	function validatePasswordConfirm(pass: string, value: string) {
		let error;
		if (pass !== value) {
			error = 'Password and confirm password doesnt match';
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
						Sign up
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
								passwordConfirm: '',
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
										<FormControl id="passwordConfirm" isRequired>
											<Field
												name="passwordConfirm"
												validate={(value: string) =>
													validatePasswordConfirm(props.values.password, value)
												}
											>
												{(formikObject: any) => (
													<FormControl
														isInvalid={
															formikObject.form.errors.passwordConfirm &&
															formikObject.form.touched.passwordConfirm
														}
													>
														<FormLabel>PasswordConfirm</FormLabel>
														<InputGroup>
															<Input
																{...formikObject.field}
																type={showPasswordConfirm ? 'text' : 'password'}
															/>
															<InputRightElement h={'full'}>
																<Button
																	variant={'ghost'}
																	onClick={() =>
																		setShowPasswordConfirm(
																			(showPasswordConfirm) => !showPasswordConfirm
																		)
																	}
																>
																	{showPasswordConfirm ? <ViewIcon /> : <ViewOffIcon />}
																</Button>
															</InputRightElement>
														</InputGroup>
														<FormErrorMessage>
															{formikObject.form.errors.passwordConfirm}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<FormErrorMessage>Password is required</FormErrorMessage>
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
										<FormErrorMessage>{props.errors.authentication}</FormErrorMessage>
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
