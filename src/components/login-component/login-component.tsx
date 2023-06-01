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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

export default function LoginComponent(props: any) {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const { setIsLogin } = props;
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
		} else if (!response.ok) {
			formProps.setFieldError('authentication', 'No connection to server! Please try again later.');
		} else if (formProps) {
			formProps.setFieldError('authentication', 'Invalid username or password');
		}
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
						<FormControl marginBottom={'1rem'} id="username" isRequired>
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
							<Text align={'center'}>
								Do you want to join us?{' '}
								<Button
									variant={'link'}
									onClick={() => {
										setIsLogin(false);
									}}
								>
									Sign up
								</Button>
							</Text>
						</Stack>
					</Form>
				);
			}}
		</Formik>
	);
}
