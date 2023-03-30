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
	useColorModeValue,
	Link,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	FormErrorMessage
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Header from '../../template/header/header';

function Telegram() {
	const [hasData, setHasData] = useState(false);

	function validateTelegramAccountId(value: string) {
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

	return (
		<Header>
			<Stack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
				<Stack align="stretch" direction="column" spacing={4}>
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
					<Card bg={useColorModeValue('white', 'gray.900')}>
						<CardBody>
							<Formik
								initialValues={{
									telegramAccountId: '',
									securityToken: ''
								}}
								onSubmit={(values, actions) => {
									setTimeout(() => {
										alert(JSON.stringify(values, null, 2));
										actions.setSubmitting(false);
									}, 1000);
								}}
							>
								{(props) => (
									<Form>
										<FormControl id="telegramAccountId" isRequired>
											<Field name="telegramAccountId" validate={validateTelegramAccountId}>
												{(formikObject: any) => (
													<FormControl
														isInvalid={
															formikObject.form.errors.telegramAccountId &&
															formikObject.form.touched.telegramAccountId
														}
													>
														<FormLabel>Telegram ID</FormLabel>
														<Input {...formikObject.field} type="text" />
														<FormErrorMessage>
															{formikObject.form.errors.telegramAccountId}
														</FormErrorMessage>
														<FormHelperText>ID of your telegram account</FormHelperText>
													</FormControl>
												)}
											</Field>
										</FormControl>
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
															Security token generated by the telegram bot. It's used as safety
															measure against suplantation.
														</FormHelperText>{' '}
													</FormControl>
												)}
											</Field>
										</FormControl>
										<Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
											Update
										</Button>
										{hasData && (
											<Button marginLeft="7px" mt={4} colorScheme="red">
												Delete
											</Button>
										)}
									</Form>
								)}
							</Formik>
						</CardBody>
					</Card>
				</Stack>
			</Stack>
		</Header>
	);
}

export default Telegram;
