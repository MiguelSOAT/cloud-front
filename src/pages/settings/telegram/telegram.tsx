import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	Card,
	CardBody,
	Stack,
	StackDivider,
	Link,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	FormErrorMessage,
	Spinner,
	Flex,
	useToast
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Header from '../../../components/header/header';

function Telegram() {
	const toast = useToast();
	const [telegramId, setTelegramId] = useState('');
	const [securityToken, setSecurityToken] = useState('');
	const [firstLoad, setFirstLoad] = useState(true);

	const [hasData, setHasData] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	function validateTelegramId(value: string) {
		let error;
		if (!value) {
			error = 'Telegram ID is required';
		}
		return error;
	}

	function validateSecurityToken(value: string) {
		let error;
		if (!value) {
			error = 'Security token is required';
		}
		return error;
	}

	function addToast(message: string, ok: boolean) {
		toast({
			position: 'bottom-left',
			duration: 3000,
			title: 'Telegram Account Configuration',
			status: ok ? 'success' : 'error',
			description: message
		});
	}

	const getCredentials = () => {
		fetch('/api/v1/user/telegram', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin',
			redirect: 'follow'
		})
			.then((response) => response.json())
			.then((data) => {
				setTelegramId(data.telegramId);
				setSecurityToken(data.securityToken);
				if (data.telegramId !== '' && data.securityToken !== '') {
					setHasData(true);
				}
				setIsLoaded(true);
			})
			.catch(() => {
				setIsLoaded(true);
			});
	};

	const postCredentials = (values: any, actions: any) => {
		fetch('/api/v1/user/telegram', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin',
			redirect: 'follow',
			body: JSON.stringify({
				telegramId: values.telegramId,
				securityToken: values.securityToken
			})
		})
			.then((response) => response.json())
			.then((data) => {
				addToast(data.message, data.ok);
				actions.setSubmitting(false);
				if (data.ok) {
					setHasData(true);
				} else {
					setTelegramId('');
					setSecurityToken('');
				}
			})
			.catch(() => {
				actions.setSubmitting(false);
				addToast('Error updating credentials, try again later', false);
			});
	};

	const deleteCredentials = () => {
		setIsLoaded(false);
		fetch('/api/v1/user/telegram', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin',
			redirect: 'follow'
		}).then((response) => {
			setIsLoaded(true);
			setHasData(false);
		});
	};

	if (firstLoad) {
		getCredentials();
		setFirstLoad(false);
	}

	const botInfo = () => {
		return (
			<>
				<Alert status="warning">
					<AlertIcon />
					<AlertTitle>You need to have a telegram account to use this feature!</AlertTitle>
					<AlertDescription>
						If you don't have one, you can create one{' '}
						<Link color="teal.500" href="https://telegram.org/" isExternal>
							here <ExternalLinkIcon mx="2px" />
						</Link>
					</AlertDescription>
				</Alert>
				<Alert status="warning">
					<AlertIcon />
					<AlertTitle>
						Type /credentials on chat{' '}
						<Link color="teal.500" href="https://telegram.me/test_tfm_miguel_bot" isExternal>
							bot <ExternalLinkIcon mx="2px" />
						</Link>
						.
					</AlertTitle>
					<AlertDescription>
						It will send you a security token and a Telegram ID to use in this form.
					</AlertDescription>
				</Alert>
			</>
		);
	};

	return (
		<Header>
			<Stack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
				{isLoaded ? (
					<Stack align="stretch" direction="column" spacing={4}>
						{botInfo()}
						<Card bg={'#fafafa'}>
							<CardBody>
								<Formik
									initialValues={{
										telegramId: telegramId,
										securityToken: securityToken
									}}
									onSubmit={(values, actions) => {
										postCredentials(values, actions);
									}}
									enableReinitialize={true}
								>
									{(props) => (
										<Form>
											<FormControl id="telegramId" isRequired>
												<Field name="telegramId" validate={validateTelegramId}>
													{(formikObject: any) => (
														<FormControl
															isInvalid={
																formikObject.form.errors.telegramId &&
																formikObject.form.touched.telegramId
															}
														>
															<FormLabel>Telegram ID</FormLabel>
															<Input {...formikObject.field} type="number" disabled={hasData} />
															<FormErrorMessage>
																{formikObject.form.errors.telegramId}
															</FormErrorMessage>
															<FormHelperText>ID of your telegram account</FormHelperText>
														</FormControl>
													)}
												</Field>
											</FormControl>
											{!hasData && (
												<>
													<FormControl id="securityToken" isRequired>
														<Field name="securityToken" validate={validateSecurityToken}>
															{(formikObject: any) => (
																<FormControl
																	isInvalid={
																		formikObject.form.errors.securityToken &&
																		formikObject.form.touched.securityToken
																	}
																>
																	<FormLabel>Security token</FormLabel>
																	<Input {...formikObject.field} type="text" />
																	<FormErrorMessage>
																		{formikObject.form.errors.securityToken}
																	</FormErrorMessage>
																	<FormHelperText>
																		Security token generated by the telegram bot. It's used as
																		safety measure against suplantation.
																	</FormHelperText>{' '}
																</FormControl>
															)}
														</Field>
													</FormControl>
													<Button
														mt={4}
														color={'white'}
														backgroundColor={'#1a51fb'}
														isLoading={props.isSubmitting}
														type="submit"
														_hover={{ bg: '#3264ff' }}
													>
														Update
													</Button>
												</>
											)}

											{hasData && (
												<Button
													marginLeft="7px"
													mt={4}
													colorScheme="red"
													onClick={deleteCredentials}
												>
													Delete
												</Button>
											)}
										</Form>
									)}
								</Formik>
							</CardBody>
						</Card>
					</Stack>
				) : (
					<Flex justifyContent={'center'} alignItems="center" h={'60vh'}>
						<Spinner h={10} w={10}></Spinner>
					</Flex>
				)}
			</Stack>
		</Header>
	);
}

export default Telegram;
