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
	Link,
	FormErrorMessage,
	Image,
	HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import './login.css';
import githubLogo from '../../assets/social-media/github-mark.svg';
import linkedinLogo from '../../assets/social-media/linkedin-mark.svg';
import SessionComponent from '../../components/session-component/session-component';

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const {
		formState: { errors, isSubmitting }
	} = useForm();

	async function onSubmit(values: any, formProps: any, user?: string, pass?: string) {
		const username = user || values.username;
		const password = pass || values.password;

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

		if (response.status === 200) {
			localStorage.setItem('username', username);
			navigate('/');
		} else if (formProps) {
			formProps.setFieldError('authentication', 'Invalid username or password');
		}
	}

	async function demoSubmit(username = 'demo', password = 'fakepassword') {
		onSubmit(null, null, username, password);
	}

	function validateUsername(value: string) {
		let error;
		if (!value) {
			error = 'Username is required';
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
		<SessionComponent>
			<Stack align={'center'}>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Log in
				</Heading>
				<Text fontSize={'lg'} color={'gray.600'}>
					to start saving your information 🚀
				</Text>
			</Stack>
			<Box width={{ base: '100%', md: '100%' }} px={{ base: 0, md: '20%' }}>
				<Stack gap={'4'}>
					<Button
						loadingText="Submitting"
						size="lg"
						bg={'#00C957'}
						color={'#fafafa'}
						_hover={{
							bg: '#02e765'
						}}
						isLoading={isSubmitting}
						w={'100%'}
						onClick={() => demoSubmit()}
						marginTop={'1rem'}
					>
						Try a demo
					</Button>
					<Text
						fontSize="xs"
						position="relative"
						sx={{
							'&::before, &::after': {
								display: 'inline-block',
								content: '""',
								borderTop: '.1rem solid black',
								width: '30%',
								margin: '0 0.5rem',
								transform: 'translateY(-0.20rem)'
							}
						}}
					>
						Or
					</Text>
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
														formikObject.form.errors.username && formikObject.form.touched.username
													}
												>
													<FormLabel>Username</FormLabel>
													<Input {...formikObject.field} type="text" fontFamily={'Roboto'} />
													<FormErrorMessage>{formikObject.form.errors.username}</FormErrorMessage>
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
														formikObject.form.errors.password && formikObject.form.touched.password
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
									<Stack direction={'column'} align={'center'} spacing={4} pt={2}>
										<Button
											loadingText="Submitting"
											size="lg"
											bg={'#1a51fb'}
											color={'#fafafa'}
											_hover={{
												bg: '#0067ff'
											}}
											type="submit"
											isLoading={isSubmitting}
											w={'100%'}
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
			<HStack justifyContent={'center'} gap={5}>
				<Link href="https://github.com/MiguelSOAT" target="_blank">
					<Image
						display={'flex'}
						maxH={{ base: '20px', md: '30px' }}
						objectFit="cover"
						src={githubLogo}
						cursor={'pointer'}
					></Image>
				</Link>
				<Link href="https://www.linkedin.com/in/miguelsoat/" target="_blank">
					<Image
						display={'flex'}
						maxH={{ base: '30px', md: '40px' }}
						objectFit="cover"
						src={linkedinLogo}
						cursor={'pointer'}
					></Image>
				</Link>
			</HStack>
		</SessionComponent>
	);
}
