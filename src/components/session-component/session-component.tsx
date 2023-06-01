import {
	Grid,
	VStack,
	Heading,
	Stack,
	Text,
	Box,
	Button,
	HStack,
	Icon,
	Link
} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import cloudAnimation from '../../assets/lottie/login-cloud-computing.json';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SessionComponent(props: any) {
	const children = props.children;
	const navigate = useNavigate();

	const {
		formState: { errors, isSubmitting }
	} = useForm();

	async function demoSubmit(username = 'demo', password = 'fakepassword') {
		onSubmit(null, null, username, password);
	}

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
	return (
		<Grid
			templateColumns={{ md: '3fr 5fr' }}
			h={'100vh'}
			backgroundColor={'#1d1d1d'}
			alignContent={'center'}
			color={'#fafafa'}
			w={{ base: '100vw', md: '100%' }}
		>
			<VStack
				h="100vh"
				display={{ base: 'none', md: 'flex' }}
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Heading fontSize="4xl" textAlign="center">
					<Typewriter
						options={{
							strings: ['Secure.', 'Reliable.', 'Professional.', 'Versatile.'],
							autoStart: true,
							loop: true
						}}
					/>
				</Heading>
				<Text fontSize="xl" fontWeight={500} marginLeft={0}>
					Your cloud solution.
				</Text>
				<Text fontSize="md">Discover the new way of storing your data.</Text>
				<Box width={'70%'}>
					<Lottie animationData={cloudAnimation} />
				</Box>
			</VStack>

			<Stack
				spacing={12}
				m={'auto'}
				py={12}
				px={12}
				minH={'100vh'}
				backgroundColor={'#fafafa'}
				color={'black'}
				boxShadow={{ base: 'none', md: 'inset 5px 0px 3px #252525' }}
				w={{ base: '100vw', md: '100%' }}
				display={'flex'}
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						{props.title}
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						{props.subtitle}
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
							w={'100%'}
							textAlign="center"
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
						{children}
					</Stack>
				</Box>
				<HStack justifyContent={'center'} gap={5}>
					<Link href="https://github.com/MiguelSOAT" target="_blank">
						<Icon
							as={FaGithub}
							color="#000000"
							width={{
								base: '5vw',
								md: '2vw'
							}}
							height="auto"
						/>
					</Link>
					<Link href="https://www.linkedin.com/in/miguelsoat/" target="_blank">
						<Icon
							as={FaLinkedin}
							color="#0A66C2"
							width={{
								base: '5vw',
								md: '2vw'
							}}
							height="auto"
						/>
					</Link>
				</HStack>
			</Stack>
		</Grid>
	);
}
