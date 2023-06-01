import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Text,
	Link,
	FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import SessionComponent from '../../components/session-component/session-component';

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

	async function demoSubmit(username = 'demo', password = 'fakepassword') {
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
		}
	}

	return (
		<SessionComponent title="Sign up" subtitle="to join to our community 🤗">
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
							<FormControl marginBottom={'1rem'} id="username" isRequired>
								<Field name="username" validate={validateUsername}>
									{(formikObject: any) => (
										<FormControl
											isInvalid={
												formikObject.form.errors.username && formikObject.form.touched.username
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
							<FormControl marginBottom={'1rem'} id="password" isRequired>
								<Field name="password" validate={validatePassword}>
									{(formikObject: any) => (
										<FormControl
											isInvalid={
												formikObject.form.errors.password && formikObject.form.touched.password
											}
										>
											<FormLabel>Password</FormLabel>
											<InputGroup>
												<Input {...formikObject.field} type={showPassword ? 'text' : 'password'} />
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
							<FormControl marginBottom={'1rem'} id="passwordConfirm" isRequired>
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
															setShowPasswordConfirm((showPasswordConfirm) => !showPasswordConfirm)
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
							<FormControl marginBottom={'1rem'} id="authentication" isRequired>
								<Field name="authentication">
									{(formikObject: any) => (
										<FormControl isInvalid={formikObject.form.errors.authentication}>
											<FormErrorMessage>{formikObject.form.errors.authentication}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<FormErrorMessage>Password is required</FormErrorMessage>
							</FormControl>
							<FormErrorMessage>{props.errors.authentication}</FormErrorMessage>
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
		</SessionComponent>
	);
}
