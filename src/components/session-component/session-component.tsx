// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import {
// 	Grid,
// 	VStack,
// 	Heading,
// 	Stack,
// 	Button,
// 	FormControl,
// 	FormLabel,
// 	Input,
// 	FormErrorMessage,
// 	InputGroup,
// 	InputRightElement,
// 	HStack,
//     Text,
//     Box
// } from '@chakra-ui/react';
// import { Formik, Field } from 'formik';
// import Lottie from 'lottie-react';
// import { Form, Link, NavLink } from 'react-router-dom';

// export default function SessionComponent(props: any) {
// 	return (
// 		<Grid
// 			templateColumns={{ md: '3fr 5fr' }}
// 			h={'100vh'}
// 			backgroundColor={'#1d1d1d'}
// 			alignContent={'center'}
// 			color={'#fafafa'}
// 			w={{ base: '100vw', md: '100%' }}
// 		>
// 			<VStack
// 				h="100vh"
// 				display={{ base: 'none', md: 'flex' }}
// 				style={{
// 					flexDirection: 'column',
// 					justifyContent: 'center',
// 					alignItems: 'center'
// 				}}
// 			>
// 				<Heading fontSize="4xl" textAlign="center">
// 					<Typewriter
// 						options={{
// 							strings: ['Secure.', 'Reliable.', 'Professional.', 'Versatile.'],
// 							autoStart: true,
// 							loop: true
// 						}}
// 					/>
// 				</Heading>
// 				<Text fontSize="xl" fontWeight={500} marginLeft={0}>
// 					Your cloud solution.
// 				</Text>
// 				<Text fontSize="md">Discover the new way of storing your data.</Text>
// 				<Box width={'70%'}>
// 					<Lottie animationData={cloudAnimation} />
// 				</Box>
// 			</VStack>

// 			<Stack
// 				spacing={12}
// 				m={'auto'}
// 				py={12}
// 				px={12}
// 				minH={'100vh'}
// 				backgroundColor={'#fafafa'}
// 				color={'black'}
// 				boxShadow={{ base: 'none', md: 'inset 5px 0px 3px #252525' }}
// 				w={{ base: '100vw', md: '100%' }}
// 				display={'flex'}
// 				flexDirection="column"
// 				justifyContent="center"
// 				alignItems="center"
// 			>
// 				<Stack align={'center'}>
// 					<Heading fontSize={'4xl'} textAlign={'center'}>
// 						Log in
// 					</Heading>
// 					<Text fontSize={'lg'} color={'gray.600'}>
// 						to start saving your information 🚀
// 					</Text>
// 				</Stack>
// 				<Box width={{ base: '100%', md: '100%' }} px={{ base: 0, md: '20%' }}>
// 					<Stack gap={'4'}>
// 						<Button
// 							loadingText="Submitting"
// 							size="lg"
// 							bg={'#00C957'}
// 							color={'#fafafa'}
// 							_hover={{
// 								bg: '#02e765'
// 							}}
// 							isLoading={isSubmitting}
// 							w={'100%'}
// 							onClick={() => demoSubmit()}
// 							marginTop={'1rem'}
// 						>
// 							Try a demo
// 						</Button>
// 						<Text
// 							fontSize="xs"
// 							position="relative"
// 							sx={{
// 								'&::before, &::after': {
// 									display: 'inline-block',
// 									content: '""',
// 									borderTop: '.1rem solid black',
// 									width: '30%',
// 									margin: '0 0.5rem',
// 									transform: 'translateY(-0.20rem)'
// 								}
// 							}}
// 						>
// 							Or
// 						</Text>
// 						<Formik
// 							initialValues={{
// 								username: '',
// 								password: '',
// 								authentication: ''
// 							}}
// 							onSubmit={onSubmit}
// 						>
// 							{(props) => {
// 								return (
// 									<Form>
// 										<FormControl className="margin-form-control" id="username" isRequired>
// 											<Field name="username" validate={validateUsername}>
// 												{(formikObject: any) => (
// 													<FormControl
// 														isInvalid={
// 															formikObject.form.errors.username &&
// 															formikObject.form.touched.username
// 														}
// 													>
// 														<FormLabel>Username</FormLabel>
// 														<Input {...formikObject.field} type="text" fontFamily={'Roboto'} />
// 														<FormErrorMessage>{formikObject.form.errors.username}</FormErrorMessage>
// 													</FormControl>
// 												)}
// 											</Field>
// 											{/* <Input name="username" type="text" /> */}
// 										</FormControl>
// 										<FormControl className="margin-form-control" id="password" isRequired>
// 											<Field name="password" validate={validatePassword}>
// 												{(formikObject: any) => (
// 													<FormControl
// 														isInvalid={
// 															formikObject.form.errors.password &&
// 															formikObject.form.touched.password
// 														}
// 													>
// 														<FormLabel>Password</FormLabel>
// 														<InputGroup>
// 															<Input
// 																{...formikObject.field}
// 																type={showPassword ? 'text' : 'password'}
// 															/>
// 															<InputRightElement h={'full'}>
// 																<Button
// 																	variant={'ghost'}
// 																	onClick={() => setShowPassword((showPassword) => !showPassword)}
// 																>
// 																	{showPassword ? <ViewIcon /> : <ViewOffIcon />}
// 																</Button>
// 															</InputRightElement>
// 														</InputGroup>
// 														<FormErrorMessage>{formikObject.form.errors.password}</FormErrorMessage>
// 													</FormControl>
// 												)}
// 											</Field>
// 										</FormControl>
// 										<FormControl className="margin-form-control" id="authentication" isRequired>
// 											<Field name="authentication">
// 												{(formikObject: any) => (
// 													<FormControl isInvalid={formikObject.form.errors.authentication}>
// 														<FormErrorMessage>
// 															{formikObject.form.errors.authentication}
// 														</FormErrorMessage>
// 													</FormControl>
// 												)}
// 											</Field>
// 											<FormErrorMessage>Password is required</FormErrorMessage>
// 										</FormControl>
// 										<Stack direction={'column'} align={'center'} spacing={4} pt={2}>
// 											<Button
// 												loadingText="Submitting"
// 												size="lg"
// 												bg={'#1a51fb'}
// 												color={'#fafafa'}
// 												_hover={{
// 													bg: '#0067ff'
// 												}}
// 												type="submit"
// 												isLoading={isSubmitting}
// 												w={'100%'}
// 											>
// 												Log in
// 											</Button>
// 										</Stack>
// 										<Stack pt={6}>
// 											<Text fontSize={'xs'} align={'center'}>
// 												Do you want to join us?{' '}
// 												<Link color={'blue.400'} as={NavLink} to="/signup">
// 													Sign up
// 												</Link>
// 											</Text>
// 										</Stack>
// 									</Form>
// 								);
// 							}}
// 						</Formik>
// 					</Stack>
// 				</Box>
// 				<HStack justifyContent={'center'} gap={5}>
// 					<Link href="https://github.com/MiguelSOAT" target="_blank">
// 						<Image
// 							display={'flex'}
// 							maxH={{ base: '20px', md: '30px' }}
// 							objectFit="cover"
// 							src={githubLogo}
// 							cursor={'pointer'}
// 						></Image>
// 					</Link>
// 					<Link href="https://www.linkedin.com/in/miguelsoat/" target="_blank">
// 						<Image
// 							display={'flex'}
// 							maxH={{ base: '30px', md: '40px' }}
// 							objectFit="cover"
// 							src={linkedinLogo}
// 							cursor={'pointer'}
// 						></Image>
// 					</Link>
// 				</HStack>
// 			</Stack>
// 		</Grid>
// 	);
// }
