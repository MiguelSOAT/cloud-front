import {
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
	Grid,
	Image
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import './login.css';
import cloudAnimation from '../../assets/lottie/login-cloud.json';
// import cloudComputingAnimation from '../../assets/lottie/login-cloud-computing.json';
// import bigDataAnimation from '../../assets/lottie/login-big-data.json';
import Lottie from 'lottie-react';
import simpleLogo from '../../assets/miguelsoat/logotipo-noBG-croped-mini.png';

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

		const url = `/api/v1/login/password?username=${username}&password=${password}`;
		const response: Response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			body: JSON.stringify(payload),
			redirect: 'follow'
		});

		// const json = await response.json();
		if (response.status === 200) {
			localStorage.setItem('username', username);
			navigate('/');
		} else {
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
		<>
			<Image
				display={'flex'}
				maxH={{ base: '300px', md: '50px' }}
				objectFit="cover"
				src={simpleLogo}
				position={'fixed'}
				top={'5px'}
				left={'5px'}
			></Image>
			<Grid
				templateColumns={{ md: '3fr 5fr' }}
				minH={'100vh'}
				backgroundImage={'linear-gradient(to bottom right, white, #c8cdd4)'}
				alignContent={'center'}
			>
				<Stack
					spacing={8}
					maxW={'lg'}
					py={12}
					px={6}
					m={'auto'}
					display={{ base: 'none', md: 'block' }}
				>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'} textAlign={'center'}>
							Secure. Reliable. Professional. Versatile. Your cloud solution.
						</Heading>
						<Text fontSize={'lg'} color={'gray.600'}>
							Discover the new way of storing your data in the cloud.
						</Text>
					</Stack>
					<Lottie animationData={cloudAnimation} />;
				</Stack>
				<Stack spacing={8} py={12} px={'auto'} minH={'100vh'} backgroundColor={'white'}>
					<Stack spacing={8} m={'auto'} minW={'lg'} py={12} px={6}>
						<Stack align={'center'}>
							<Heading fontSize={'4xl'} textAlign={'center'}>
								Log in
							</Heading>
							<Text fontSize={'lg'} color={'gray.600'}>
								to start saving your information 🚀
							</Text>
						</Stack>
						<Box
							bg={useColorModeValue('whiteAlpha.700', 'gray.700')}
							width={{ base: '100%', md: '100%' }}
						>
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
												<FormControl className="margin-form-control" id="username" isRequired>
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
																<FormErrorMessage>
																	{formikObject.form.errors.username}
																</FormErrorMessage>
															</FormControl>
														)}
													</Field>
													{/* <Input name="username" type="text" /> */}
												</FormControl>
												<FormControl className="margin-form-control" id="password" isRequired>
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
																			onClick={() =>
																				setShowPassword((showPassword) => !showPassword)
																			}
																		>
																			{showPassword ? <ViewIcon /> : <ViewOffIcon />}
																		</Button>
																	</InputRightElement>
																</InputGroup>
																<FormErrorMessage>
																	{formikObject.form.errors.password}
																</FormErrorMessage>
															</FormControl>
														)}
													</Field>
												</FormControl>
												<FormControl className="margin-form-control" id="authentication" isRequired>
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
														bg={'#0000FF'}
														color={'white'}
														_hover={{
															bg: '#0067ff'
														}}
														type="submit"
														isLoading={isSubmitting}
													>
														Log in
													</Button>
												</Stack>
												<Stack pt={6}>
													<Text fontSize={'xs'} align={'center'}>
														Do you want to join us?{' '}
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
				</Stack>
			</Grid>
		</>
	);
}
